import requests
import json
from utils import host

def readUsers():
    return ['Berni-deilik42', 'David-blondy08', 'David-Klass89', 'Esteve-slurmf', 'Jordi-Xai', 'Marc-Marc Bcl', 'Marc-Senki', 'Miquel-Mike', 'Miquel-Miki', 'Montxi-Montxi46', 'Oscar-Subi', 'Patx-Patx', 'Raka-Raka']

def main():
    users = readUsers()
    for u in users:
        js = {'username': u.split('-')[1], 'name': u.split('-')[0]}
        print(json.dumps(js))
        r = requests.post(host+'/users', data=js)
        print(r.text) 

if __name__ == "__main__":
    main()