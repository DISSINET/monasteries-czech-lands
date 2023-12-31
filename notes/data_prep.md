# Data preparation

## Starting db locally nad restoring from backup

```
rethinkdb --bind all --driver-port 27015 --http-port 8085
rethinkdb restore backup_2023_03_15.tar.gz -c localhost:27015
```

## Sourcing the data.json 

Start an ipython session, within:

```
from rethinkdb import RethinkDB
r = RethinkDB()
r.connect( "localhost", 27015, "monasteries").repl()
records = r.table('records').run()


result = r.table('records').filter({'source':'705d3824-fc8c-41df-a336-dcc7d596dc97'}).pluck('monastery_id', 'id', {'components': {'data', 'type'}}).group('monastery_id').map(lambda mon:
     {
     'id': mon['monastery_id'],
     'record_id': mon['id'],
     'other_names': mon['components'].filter({'type':'1'}).concat_map(lambda comp: [comp['data']['value']]),
     'geo' : mon['components'].filter({'type':'2'}).concat_map(lambda comp: [comp['data']['y'], comp['data']['x']]),
     'geo_confidence' : mon['components'].filter({'type':'2'}).concat_map(lambda comp: [comp['data']['confidence']]),
     'communities' : mon['components'].filter({'type':'3'}).has_fields({'data':{'order': True}}).concat_map(lambda comp: [ {
         'order':comp['data']['order'],
         'time': [ comp['data']['time']['from']['post'],
                   comp['data']['time']['from']['ante'],
                   comp['data']['time']['to']['post'],
                   comp['data']['time']['to']['ante']
                 ]
               }
             ]
          ),
      'communities_count' : mon['components'].filter({'type':'3'}).has_fields({'data':{'order': True}}).count(),
      'statuses' : mon['components'].filter({'type':'4'}).concat_map(lambda comp: [ {
          'status':comp['data']['value'],
          'time': [ comp['data']['time']['from']['post'],
                    comp['data']['time']['from']['ante'],
                    comp['data']['time']['to']['post'],
                    comp['data']['time']['to']['ante']
                  ]
                }
              ]
           ),
      'statuses_count' : mon['components'].filter({'type':'4'}).count(),
      'dedications' : mon['components'].filter({'type':'7'}).concat_map(lambda comp: [ {
          'dedication':comp['data']['value'],
          'time': [ comp['data']['time']['from']['post'],
                    comp['data']['time']['from']['ante'],
                    comp['data']['time']['to']['post'],
                    comp['data']['time']['to']['ante']
                  ]
                }
              ]
           ),
      'sources': mon['components'].filter({'type':'9'}).concat_map(lambda comp: [comp['data']])
     }
 ).has_fields('geo').has_fields('record_id').ungroup().map(lambda item: item['reduction'].nth(0)).eq_join("id", r.table('monasteries'), index="id").zip().run()


import json
with open('data.json', 'w') as outfile:
    json.dump(result, outfile)

```
