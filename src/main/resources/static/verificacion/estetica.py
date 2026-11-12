# Capturas para la revisión estética: inicio, revelación final, informe, stand, rúbrica (pc y celular)
import asyncio, sys
from playwright.async_api import async_playwright
APP='/home/claude/build/Marki_UAP'; URL='file://'+APP+'/index.html'; OUT='/home/claude/estetica/'+(sys.argv[1] if len(sys.argv)>1 else 'antes')
import os; os.makedirs(OUT,exist_ok=True)
SIM=open(APP+'/verificacion/datos_simulados.json',encoding='utf8').read()
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch(); errs=[]
        for nom,vp in [('pc',{'width':1366,'height':768}),('cel',{'width':390,'height':844}),('tv',{'width':1920,'height':1080})]:
            pg=await b.new_page(viewport=vp, device_scale_factor=1); pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(URL); await pg.evaluate("localStorage.clear()")
            if nom=='tv':
                await pg.evaluate("s=>{var d=JSON.parse(s);for(var i=0;i<4;i++){var e=JSON.parse(JSON.stringify(d.evals[i]));e.id='feria'+i;e.origen='Feria';e.fecha=new Date().toISOString();d.evals.push(e)}localStorage.setItem('radar_uap_v1',JSON.stringify(d))}",SIM)
                await pg.goto(URL+'#stand'); await pg.wait_for_timeout(2500); await pg.screenshot(path=f'{OUT}/stand_{nom}.png'); await pg.close(); continue
            await pg.goto(URL+'#inicio'); await pg.wait_for_timeout(1800); await pg.screenshot(path=f'{OUT}/inicio_{nom}.png')
            await pg.click('text=Ver una demostración'); await pg.wait_for_timeout(700); await pg.screenshot(path=f'{OUT}/rev1_{nom}.png')
            await pg.wait_for_timeout(5200); await pg.screenshot(path=f'{OUT}/rev2_{nom}.png', full_page=True)
            await pg.click('#rver'); await pg.wait_for_timeout(600); await pg.screenshot(path=f'{OUT}/informe_{nom}.png')
            await pg.goto(URL+'#nueva'); await pg.wait_for_timeout(300); await pg.fill('#nom','Pollos Copacabana'); await pg.click('#rub .chip >> nth=0'); await pg.click('#red .chip >> nth=0'); await pg.check('#cons'); await pg.click('#sig'); await pg.wait_for_timeout(400)
            await pg.click('#pest [data-tab="D1"]'); await pg.wait_for_timeout(500); await pg.screenshot(path=f'{OUT}/rubrica_{nom}.png')
            await pg.evaluate("s=>localStorage.setItem('radar_uap_v1',s)",SIM); await pg.goto(URL+'#stand'); await pg.wait_for_timeout(2500); await pg.screenshot(path=f'{OUT}/stand_{nom}.png')
            await pg.close()
        print('ERR',errs); await b.close()
asyncio.run(m())
