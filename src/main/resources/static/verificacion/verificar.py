# -*- coding: utf-8 -*-
"""Verificación independiente de los cálculos estadísticos de la plataforma Marki.
Usa los datos simulados de esta carpeta (no son negocios reales).
Requiere: Python 3, numpy, scipy y scikit-learn (pip install numpy scipy scikit-learn).
Uso: python verificar.py
"""
import json, os, re
import numpy as np
from scipy import stats
from sklearn.metrics import cohen_kappa_score

aqui = os.path.dirname(os.path.abspath(__file__))
db = json.load(open(os.path.join(aqui, 'datos_simulados.json'), encoding='utf8'))
txt = open(os.path.join(aqui, '..', 'rubrica.js'), encoding='utf8').read()
R = json.loads(re.sub(r'^window\.RUBRICA = |;\s*$', '', txt.strip()))
items = [it['id'] for d in R['dimensiones'] for it in d['items']]


def dims(resp):
    out = []
    for d in R['dimensiones']:
        s = [resp.get(it['id']) for it in d['items']]
        s = [x for x in s if x in (0, 1, 2)]
        out.append(sum(s) / (2 * len(s)) * 100 if s else None)
    return out


def indice(resp):
    return np.mean([v for v in dims(resp) if v is not None])


est = sorted([e for e in db['evals'] if e['origen'] == 'Estudio'], key=lambda e: e['fecha'])
g = {}
for e in est:
    g.setdefault(e['codigo'], []).append(e)
una = [l[0] for l in g.values()]
pares = [(l[0], l[1]) for l in g.values() if len(l) > 1 and l[0]['evaluador'] != l[1]['evaluador']]

# CCI(2,1): dos vías, efectos aleatorios, acuerdo absoluto, un evaluador (Shrout y Fleiss, 1979)
M = np.array([[indice(a['resp']), indice(b['resp'])] for a, b in pares])
n, k = M.shape
gm = M.mean()
msr = k * ((M.mean(1) - gm) ** 2).sum() / (n - 1)
msc = n * ((M.mean(0) - gm) ** 2).sum() / (k - 1)
mse = (((M - gm) ** 2).sum() - msr * (n - 1) - msc * (k - 1)) / ((n - 1) * (k - 1))
icc = (msr - mse) / (msr + (k - 1) * mse + k * (msc - mse) / n)

# Kappa ponderada cuadrática de los indicadores (Cohen, 1968)
x, y = [], []
for a, b in pares:
    for i in items:
        if a['resp'].get(i) in (0, 1, 2) and b['resp'].get(i) in (0, 1, 2):
            x.append(a['resp'][i]); y.append(b['resp'][i])
kw = cohen_kappa_score(x, y, weights='quadratic')

# Friedman entre las 7 dimensiones (negocios con todas las dimensiones evaluadas)
D = [dims(e['resp']) for e in una]
D = np.array([d for d in D if None not in d])
fr = stats.friedmanchisquare(*D.T)

# Spearman entre el índice y los seguidores
seg = [(e['seguidores'], indice(e['resp'])) for e in una if e.get('seguidores') is not None]
sp = stats.spearmanr([s[0] for s in seg], [s[1] for s in seg])

print(f'Evaluaciones del estudio: {len(est)} | negocios: {len(una)} | con doble evaluación: {len(pares)}')
print(f'CCI(2,1) del índice: {icc:.4f}')
print(f'Kappa ponderada cuadrática ({len(x)} pares de indicadores): {kw:.4f}')
print(f'Friedman: chi2({D.shape[1]-1}) = {fr.statistic:.4f}, p = {fr.pvalue:.4f}, n = {len(D)}')
print(f'Spearman índice-seguidores: rho = {sp.statistic:.4f}, p = {sp.pvalue:.4f}, n = {len(seg)}')
