import requests
import json
from datetime import datetime
from utils import host

def readTournament():
    ret = {}
    ret['initDate'] = datetime.strptime('2019-04-07', '%Y-%m-%d')
    ret['endDate'] = datetime.strptime('2019-06-02', '%Y-%m-%d')
    ret['state'] = 'current'
    ret['name'] = 'MK8 Quarta edicio'
    ret['rules'] = json.dumps({'position':{'1': 12, '2': 11, '3': 10, '4': 9, '5': 8, '6': 7, '7': 6, '8': 5, '9': 4, '10': 3, '11': 2, '12': 1}})
    ret['class'] = {}
    return ret


def main():

    r = requests.post(host+"/worldcup", data=readTournament())
    print(r.text)

if __name__ == "__main__":
    main()
