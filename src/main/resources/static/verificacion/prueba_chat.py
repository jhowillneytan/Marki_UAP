# Pregúntale a Marki: cada pregunta sugerida y preguntas escritas responden sin errores y con datos del negocio.
import asyncio, re, json
from playwright.async_api import async_playwright
APP='/home/claude/build/Marki_UAP'; URL='file://'+APP+'/index.html'; OUT='/home/claude/estetica/chat'
import os; os.makedirs(OUT,exist_ok=True)
exec(open('/home/claude/scripts/limites.py').read().split('async def m')[0].split("APP=")[0])
src=open('/home/claude/scripts/limites.py').read(); ns={}; exec(src.split('async def m')[0], ns); casos=ns['casos']
LIBRES=['hola','¿cómo mejoro mis reseñas?','no aparezco en google','cuánto podría subir mi nota','¿qué publico?','precios','dame un texto','¿qué es la fotosíntesis?','gracias']
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch(); errs=[]; malos=[]
        for nom,vp in [('pc',{'width':1366,'height':900}),('cel',{'width':390,'height':844})]:
            pg=await b.new_page(viewport=vp); pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(URL); await pg.evaluate("localStorage.clear()"); await pg.goto(URL+'#inicio'); await pg.wait_for_timeout(300)
            await pg.click('text=Ver una demostración'); await pg.wait_for_timeout(600); await pg.click('#rev'); await pg.wait_for_timeout(300); await pg.click('#rver'); await pg.wait_for_timeout(500)
            n=0
            while True:
                chips=await pg.eval_on_selector_all('#chChips .ch-chip','e=>e.map(x=>x.textContent)')
                if not chips or n>=7: break
                await pg.click('#chChips .ch-chip >> nth=0'); await pg.wait_for_timeout(800); n+=1
                r=await pg.inner_text('#chLog .ch-m.marki:last-child')
                if nom=='pc': print('\n>>',chips[0],'\n',r)
                if re.search(r'undefined|NaN|null|\[object',r): malos.append((chips[0],r[:80]))
            for q in LIBRES:
                await pg.fill('#chIn',q); await pg.press('#chIn','Enter'); await pg.wait_for_timeout(800)
                r=await pg.inner_text('#chLog .ch-m.marki:last-child')
                if nom=='pc': print('\n>>',q,'\n',r[:300])
                if re.search(r'undefined|NaN|null|\[object',r): malos.append((q,r[:80]))
            await pg.locator('#chat').scroll_into_view_if_needed(); await pg.locator('#chat').screenshot(path=f'{OUT}/chat_{nom}.png')
            ancho=await pg.evaluate("document.documentElement.scrollWidth")
            if ancho>vp['width']+2: malos.append(('desborde',ancho))
            # casos límite
            await pg.evaluate("s=>{localStorage.setItem('radar_uap_v1',JSON.stringify({evals:s,expertos:{}}))}",casos)
            for c in casos:
                await pg.goto(URL+'#informe/'+c['id']); await pg.wait_for_timeout(200)
                for k in range(8):
                    ch=await pg.query_selector('#chChips .ch-chip')
                    if not ch: break
                    await ch.click(); await pg.wait_for_timeout(750)
                    r=await pg.inner_text('#chLog .ch-m.marki:last-child')
                    if re.search(r'undefined|NaN|\bnull\b|\[object',r): malos.append((c['id'],r[:100]))
            await pg.close()
        print('\nPROBLEMAS:',malos); print('ERR',errs); await b.close()
asyncio.run(m())
