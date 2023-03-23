```
r.table('records').pluck('monastery_id', {'components': {'data', 'type'}}). group('monastery_id').map(lambda mon:
     {
     'id': mon['monastery_id'],
     'name': r.table('monasteries').get(mon['monastery_id'])['name'] #TODO
     'other_names': mon['components'].filter({'type':'1'}).concat_map(lambda comp: [comp['data']['value']]),
     'geo' : mon['components'].filter({'type':'2'}).concat_map(lambda comp: [comp['data']['y'], comp['data']['x']]),
     'communities' : mon['components'].filter({'type':'3'}).has_fields({'data':{'order': True}}).concat_map(lambda comp: [ { 
         'order':comp['data']['order'], 
         'time': [ comp['data']['time']['from']['ante'], 
                   comp['data']['time']['from']['post'], 
                   comp['data']['time']['to']['ante'], 
                   comp['data']['time']['to']['post']
                 ]
               }
             ]
          ),
      'communities_count' : mon['components'].filter({'type':'3'}).has_fields({'data':{'order': True}}).count(),
      'statuses' : mon['components'].filter({'type':'4'}).concat_map(lambda comp: [ { 
          'status':comp['data']['value'], 
          'time': [ comp['data']['time']['from']['ante'], 
                    comp['data']['time']['from']['post'], 
                    comp['data']['time']['to']['ante'], 
                    comp['data']['time']['to']['post']
                  ]
                }
              ]
           ),
      'statuses_count' : mon['components'].filter({'type':'4'}).count(),
      'sources': mon['components'].filter({'type':'9'}).concat_map(lambda comp: [comp['data']])
     }
 ).has_fields('geo').ungroup().map(lambda item: item['reduction'].nth(0)).run()


```
