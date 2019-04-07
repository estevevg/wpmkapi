import requests
from utils import host
import json

def getCurrentWC():
    r = requests.get(host+'/worldcup/current')
    d = json.loads(r.text)
    return d['id']

def getGP(gpnum, wcId):
    r = requests.get(host+'/worldcup/'+wcId+'/gp')
    gps = json.loads(r.text)
    for gp in gps:
        if str(gpnum) in gp['gpname']:
            return gp
    

def readResults(gpnum):
    with open('data/results.csv') as config_file:
        data = config_file.read()
    m = []
    rows = data.split('\n')
    for r in rows:
        cells = r.split(',')
        if str(gpnum) in cells[1]:
            m.append(cells)
    return m

def strToNick(name):
    nick = name.split('(')[1].split(')')[0]
    return nick

def getCourseResult(col, m):
    results = []
    for row in m:
        nick = strToNick(row[3])
        try:
            res = int(row[col + 4])
            results.append({'username': nick, 'pos': res})
        except:
            print(nick+" didn't play this course")
    return results

def main():
    gpnum = 1
    gp = getGP(gpnum, getCurrentWC())
    results = readResults(gpnum)
    courses = json.loads(gp['courses'])
    i = 0
    for c in courses:
        res = getCourseResult(i, results)
        c['result'] = res
        i+=1
    gp['courses'] = json.dumps(courses)
    print(json.dumps(gp))
    r = requests.put(host+'/gp/'+gp['id']+'/result', data = gp)
    print(r.text)

if __name__ == "__main__":
    main()