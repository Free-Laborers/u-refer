import json
import sys

if __name__ == "__main__":
    # replace value of "proxy" in package.json with arg1

    if len(sys.argv) != 2:
        print('usage: python3 replaceProxy PROXY_HOST_URL')
    else:
        f = open('package.json', 'r')
        data = json.load(f)
        data['proxy'] = sys.argv[1]     # set proxy to arg1

        f = open('package.json', 'w')
        json.dump(data, f, indent=2)    # write the json
        f.write('\n')