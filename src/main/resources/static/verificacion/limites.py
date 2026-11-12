# Casos límite: nombre largo con símbolos, solo TikTok, sin reseñas, todo en 2, todo en 0, sin datos.
import asyncio, re, json
from playwright.async_api import async_playwright
APP='/home/claude/build/Marki_UAP'; URL='file://'+APP+'/index.html'
IDS=[f'D{d}.{i}' for d in range(1,8) for i in range(1,4)]
def ev(id, nombre, resp, **kw):
    e={'id':id,'fecha':'2026-11-12T15:00:00.000Z','nombre':nombre,'rubro':'Restaurante o comida','red':'TikTok','evaluador':'','origen':'Feria',
       'consentimiento':True,'seguidores':None,'links':{},'datos':{},'resp':resp,'auto':{k:False for k in IDS},'notas':{},'version':'1.3','codigo':id}
    e.update(kw); return e
largo='Pollería & Broaster «Doña Rosa» <b>La Original</b> 🐔 de la Avenida 9 de Febrero esquina Internacional'
casos=[
 ev('largo', largo, {k:1 for k in IDS}),
 ev('tiktok', 'Solo TikTok', dict({k:1 for k in IDS}, **{'D7.1':None}), links={'tiktok':'https://www.tiktok.com/@solo'}),
 ev('sinres', 'Sin Reseñas', dict({k:0 for k in IDS}, **{'D5.2':None,'D5.3':None,'D4.1':None}), datos={'resenas':0,'posts30':0,'formatos':[],'ficha':[],'respuesta_min':'sin'}),
 ev('todo2', 'Todo Excelente', {k:2 for k in IDS}, links={'whatsapp':'59171234567','facebook':'https://facebook.com/x'}, datos={'resenas':80,'calificacion':4.8,'posts30':14,'formatos':['Foto o afiche','Video corto','Carrusel'],'ficha':['Tiene ficha','Categoría','Horario','Teléfono','Ubicación exacta','Fotos'],'respuesta_min':5}),
 ev('todo0', 'Todo Cero', {k:0 for k in IDS}, datos={'resenas':3,'calificacion':3.1}),
]
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch(); errs=[]; malos=[]
        for vp in [{'width':1366,'height':860},{'width':390,'height':844}]:
            pg=await b.new_page(viewport=vp); pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(URL); await pg.evaluate("s=>{localStorage.clear();localStorage.setItem('radar_uap_v1',JSON.stringify({evals:s,expertos:{}}))}",casos)
            for c in casos:
                for v in ['informe','kit']:
                    await pg.goto(URL+f"#{v}/{c['id']}"); await pg.wait_for_timeout(150)
                    t=await pg.inner_text('main')
                    if re.search(r'undefined|NaN|\bnull\b|\[object', t): malos.append((v,c['id'],re.findall(r'.{30}(?:undefined|NaN|\bnull\b|\[object).{20}',t)[:2]))
                    ancho=await pg.evaluate("document.documentElement.scrollWidth")
                    if ancho>vp['width']+2: malos.append((v,c['id'],'desborde horizontal',ancho))
                    if v=='informe' and vp['width']>1000:
                        print('\n###',c['id'], '|', re.sub(r'\s+',' ',t)[:600])
                r=await pg.evaluate("(id)=>{try{var ev=JSON.parse(localStorage.getItem('radar_uap_v1')).evals.filter(x=>x.id===id)[0];var d=RADAR.pdf(ev);return d.getNumberOfPages()}catch(e){return 'ERR '+e}}", c['id'])
                if vp['width']>1000: print('PDF páginas:', r)
                if not isinstance(r,int) or r>2: malos.append(('pdf',c['id'],r))
            tab=await pg.evaluate("()=>{var t=RADAR.tabla(JSON.parse(localStorage.getItem('radar_uap_v1')).evals);return JSON.stringify(t).match(/undefined|NaN|\\[object/g)}")
            if tab: malos.append(('tabla',tab))
            await pg.goto(URL+'#panel'); await pg.wait_for_timeout(200)
            await pg.evaluate("localStorage.clear()")
            for v in ['inicio','panel','expertos','preparar','stand','config','formulario']:
                await pg.goto(URL+'#'+v); await pg.wait_for_timeout(200)
                t=await pg.inner_text('body')
                if re.search(r'undefined|NaN|\bnull\b|\[object', t): malos.append(('vacio',v,re.findall(r'.{30}(?:undefined|NaN|\bnull\b|\[object).{20}',t)[:2]))
                ancho=await pg.evaluate("document.documentElement.scrollWidth")
                if ancho>vp['width']+2: malos.append(('vacio',v,'desborde',ancho))
            await pg.close()
        print('\nPROBLEMAS:', malos); print('ERR', errs[:5]); await b.close()
asyncio.run(m())
