# Negocio solo en TikTok, sin reseñas, sin comentarios: Marki debe marcar «no se aplica» solo, sin que el estudiante lo haga.
import asyncio
from playwright.async_api import async_playwright
TODO_VISIBLE='.eval .dim,.eval .entrada{display:block!important}'
APP='/home/claude/build/Marki_UAP'; URL='file://'+APP+'/index.html'
async def sn(pg,it,k,v): await pg.click(f'[data-auto="{it}"] [data-k="{k}"] [data-sn="{1 if v else 0}"]')
async def num(pg,it,k,n): await pg.fill(f'[data-auto="{it}"] [data-k="{k}"] input', str(n))
async def nivel(pg,it): return await pg.evaluate(f"(()=>{{const b=document.querySelector('.ops[data-it=\"{it}\"] .op.on'); return b?b.dataset.v:'-'}})()")
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1366,'height':900}); errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.evaluate('localStorage.clear()'); await pg.goto(URL+'#nueva'); await pg.wait_for_timeout(300)
        await pg.fill('#nom','Solo TikTok')
        await pg.click('#rub .chip >> nth=0')
        chips=await pg.eval_on_selector_all('#red .chip','e=>e.map(x=>x.textContent)'); print('redes:',chips)
        await pg.click('#red .chip:has-text("TikTok")'); await pg.check('#cons'); await pg.click('#sig'); await pg.add_style_tag(content=TODO_VISIBLE); await pg.wait_for_timeout(300)
        await pg.fill('[data-auto="D5.1"] input','0'); await pg.wait_for_timeout(100)
        r={'D5.1':await nivel(pg,'D5.1'),'D5.2':await nivel(pg,'D5.2'),'D5.3':await nivel(pg,'D5.3')}
        r['D5.3 pregunta visible']=await pg.is_visible('[data-auto="D5.3"] [data-k="r"]')
        await num(pg,'D4.1','c',0); r['D4.1']=await nivel(pg,'D4.1'); r['D4.1 pregunta r visible']=await pg.is_visible('[data-auto="D4.1"] [data-k="r"]')
        await sn(pg,'D7.1','meta',False); r['D7.1']=await nivel(pg,'D7.1'); r['D7.1 activos visible']=await pg.is_visible('[data-auto="D7.1"] [data-k="activos"]')
        r['medidor D5.2']=await pg.inner_text('[data-med="D5.2"]'); r['D5.2 texto']=await pg.inner_text('[data-auto="D5.2"] .auto-r')
        r['D1 ayudas']=await pg.inner_text('#D1 .ayudas'); r['D4 ayudas']=await pg.inner_text('#D4 .ayudas'); r['D6 ayudas']=await pg.inner_text('#D6 .ayudas')
        r['panel']=await pg.inner_text('#prog')
        for k,v in r.items(): print(k,':',repr(v))
        # volver a poner reseñas: D5.2 y D5.3 deben quedar pendientes otra vez
        await pg.fill('[data-auto="D5.1"] input','12'); await pg.wait_for_timeout(100)
        print('con 12 reseñas → D5.2', await nivel(pg,'D5.2'), 'D5.3', await nivel(pg,'D5.3'), 'máx D5.3.r', await pg.get_attribute('[data-auto="D5.3"] [data-k="r"] input','max'))
        print('ERR', errs); await b.close()
asyncio.run(m())
