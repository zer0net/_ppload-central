# ppload portal

1 - clone this site - http://127.0.0.1:43110/1HPbR1zp6hsvrqgTSVdsEC5VWw7MEMGPTR

2 - navigate to site's folder and create data/users/content.json, copy this template:
<pre>
 {
    "files": {},
    "ignore": ".*",
    "modified": 0.0,
    "signs": {},
    "user_contents": {
      "cert_signers": {
        "zeroid.bit": [ "1iD5ZQJMNXu43w1qLB8sfdHVKppVMduGz" ]
      },
      "permission_rules": {
        ".*": {
          "files_allowed": ".*json",
          "max_size": 1000000
        },
        "bitmsg/.*@zeroid.bit": { "max_size": 15000 }
      },
      "permissions": {
        "bad@zeroid.bit": false,
        "nofish@zeroid.bit": { "max_size": 100000 }
      }
    }
  }
</pre>

3 - in zeronet shell, run this console command: 
<pre>
zeronet.py siteSign [siteaddress] --inner_path data/users/content.json
</pre>
    
4 - then sign & publish site
<pre>
zeronet.py siteSign [siteaddress] --publish
</pre>

5 - register channels to your new master site!
