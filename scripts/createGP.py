import requests
from datetime import datetime
import json

def readGP():
    gp = {}
    gp['name'] = 'GP1'
    gp['date'] = datetime.strptime('2019-04-07', '%Y-%m-%d')
    gp['couses'] = {"DS Playa Cheep Cheep": [], "Cataratas Shy Guy": [], "Circuito de Hyrule": [], "3DS Jungla DK": [], "Cumbre Wario": []}

def readFile():
    with open('data/gpinput.csv') as config_file:
        data = config_file.read()
    gps = data.split('\n')
    for gp_raw in gps:
        if 'GP ' in gp_raw:
            gp = gp_raw.split(',')
            inp = {}
            inp['name'] = gp[1]
            print(gp[2])
            inp['date'] = datetime.strptime(gp[2], '%d-%m-%Y')
            courses = {}
            for c in gp[3:]:
                courses[c] = []
            inp['courses'] = json.dumps(courses)
            print(inp)


def main():
    readFile()

if __name__ == '__main__':
    main()
