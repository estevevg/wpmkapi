import requests
import json
from datetime import datetime

def readTournament():
    ret = {}
    ret['initDate'] = datetime.strptime('2019-04-07', '%Y-%m-%d')
    ret['endDate'] = datetime.strptime('2019-06-02', '%Y-%m-%d')
    ret['state'] = 'current'
    ret['name'] = 'MK8 Quarta edicio'
    ret['rules'] = {'punts': '1'}
    ret['class'] = {}
    return ret


def main():

    r = requests.post("https://mk8api.herokuapp.com/worldcup", data=readTournament())
    print(r.text)

if __name__ == "__main__":
    main()
