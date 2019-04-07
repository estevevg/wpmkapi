import requests
from utils import host
from datetime import datetime
import json

def readGP():
    gp = {}
    gp['name'] = 'GP1'
    gp['date'] = datetime.strptime('2019-04-07', '%Y-%m-%d')
    gp['couses'] = {"DS Playa Cheep Cheep": [], "Cataratas Shy Guy": [], "Circuito de Hyrule": [], "3DS Jungla DK": [], "Cumbre Wario": []}

def getCurrentWC():
    r = requests.get(host+'/worldcup/current')
    d = json.loads(r.text)
    return d['id']

def readFile():
    wc = getCurrentWC()
    with open('data/gpinput.csv') as config_file:
        data = config_file.read()
    gps = data.split('\n')
    for gp_raw in gps:
        if 'GP ' in gp_raw:
            gp = gp_raw.split(',')
            inp = {}
            inp['gpname'] = gp[1]
            print(gp[2])
            inp['cdate'] = datetime.strptime(gp[2], '%d-%m-%Y')
            courses = []
            for c in gp[4:]:
                courses.append({'name': c, 'result':[]})
            inp['courses'] = json.dumps(courses)
            inp['worldcup'] = wc
            uploadGP(inp, wc)

def uploadGP(c, wc):
    r = requests.post(host+'/worldcup/'+wc+'/gp', data=c)
    print(r.text)

def main():
    readFile()

if __name__ == '__main__':
    main()
