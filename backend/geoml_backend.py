from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import json
import os
app = Flask(__name__)
api = Api(app)

TODOS = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': ',бля'},
    'todo3': {'task': 'profit!'},
}

CONTENT_ROOT = 'content'

dataset_list = {
  'roads':{'yaml':{'title':'Roads in general'},
           'geojson':{}},
  'car_datasets/small_cars':{'yaml':{'title':'Set of small cars'},
                             'geojson':{}},
  'example_dataset':{'yaml':{'title': 'Example dataset'},
                     'geojson': json.load(open(os.path.join(CONTENT_ROOT, 'datasets', "%s.geojson" % 'example_dataset')))}
}


map_list = {
  'dark-matter': {'title':'Dark Matter',
           'endpoint':'http://localhost:8080/styles/dark-matter/{z}/{x}/{y}.png'},

  'klokantech-basic': {'title':'Basic',
           'endpoint':'http://localhost:8080/styles/klokantech-basic/{z}/{x}/{y}.png'},

  'osm-bright': {'title':'Bright',
           'endpoint':'http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png'},
}


model_list = {
  'example_models/simple_regression': {'type':'sklearn',
                 'module_path': 'example_models/simple_regression.py'},
  'example_models/simple_detection': {'type':'sklearn',
                 'module_path': 'example_models/simple_detection.py'},
  'example_models/simple_segmentation': {'type':'sklearn',
                 'module_path': 'example_models/simple_segmentation.py'},
  'models_maxmmsu/simple_classification': {'type':'sklearn',
                 'module_path': 'example_models/simple_classification.py'},

}

predictor_list = {
  'example_models/regression_2020-01-17': {'model': 'example_models/simple_regression',
                                           'regressor_pickle':'example_models/regression_2020-01-17.pklz',
                                           'trained_process_data':{},
                                           'quality_check_data':{}}
}


parser = reqparse.RequestParser()
parser.add_argument('command')
parser.add_argument('model')

class DatasetList(Resource):
  # returns list of datasets:
  def get_dataset_list(self):

    output_dataset_list = {k:v['yaml'] if 'yaml' in v else {} for k,v in dataset_list.items()}

    return output_dataset_list

class Dataset(Resource):
  # returns particular dataset
  def get(self, dataset_name):

    return dataset_list[dataset_name]

class MapList(Resource):
  # returns list of datasets:
  def get_maps_list(self):

    return map_list

class Map(Resource):
  # returns info about particular map
  def get(self,map_name):
    return map_list[map_name]


class ModelList(Resource):
  # returns list of datasets:
  def get(self):
    return model_list

class Model(Resource):
  # returns info about particular model
  def get(self, model_name):
    return model_list[model_name]


class PredictorList(Resource):
  def get(self):
    return predictor_list

class Predictor(Resource):
  # returns particular predictor data
  def get(self,predictor_name):
    return predictor_list[predictor_name]

  def put(self, predictor_name):
      args = parser.parse_args()
      command = args['command']

      if not predictor_name in predictor_list:
        if command == 'create_and_fit':
          predictor_list[predictor_name] = {'model': args['model'],
                                            'training_data':args['training_data'],
                                          'status': 'scheduled_for_train'}
          output = {'Success':'',
                    'command':command}
          output_code = 201
        elif command == 'create':
          predictor_list[predictor_name] = {'model': args['model'],
                                            'status': 'untrained'}
          output = {'Success': '',
                    'command': command}
          output_code = 201
        else:
          output = {'Error': 'unknown command',
                    'command': command}
          output_code = 200
      else:

        output = {'Error': 'cannot put a predictor, predictor exists',
                  'predictor_name': predictor_name}
        output_code = 200
      return output, output_code


  def post(self, predictor_name):
      args = parser.parse_args()
      command = args['command']

      if command == 'fit':

        fit_data = {'training_data':args['training_data'],
                    'status':'scheduled_for_train'}

        predictor_list[predictor_name].update(fit_data)

        output = {'Success': 'command executed',
                  'command': command,
                  'new_predictor_state': predictor_list[predictor_name]}

        output_code = 201
      elif command == 'get_status':

        output = predictor_list[predictor_name]
        output_code = 201
      else:
        output = {'Error': 'unknown command',
                  'command':command}
        output_code = 200

      return output, output_code

api.add_resource(DatasetList, '/dataset_list')
api.add_resource(Dataset, '/dataset/<path:dataset_name>')

api.add_resource(MapList, '/map_list')
api.add_resource(Map, '/map/<path:map_name>')

api.add_resource(ModelList, '/model_list')
api.add_resource(Model, '/model/<path:model_name>')

api.add_resource(PredictorList, '/predictor_list')
api.add_resource(Predictor, '/predictor/<path:predictor_name>')

# def abort_if_todo_doesnt_exist(todo_id):
#     if todo_id not in TODOS:
#         abort(404, message="Todo {} doesn't exist".format(todo_id))

#
# # Todo
# # shows a single todo item and lets you delete a todo item
# class Todo(Resource):
#     def get(self, todo_id):
#         abort_if_todo_doesnt_exist(todo_id)
#         return TODOS[todo_id]
#
#     def delete(self, todo_id):
#         abort_if_todo_doesnt_exist(todo_id)
#         del TODOS[todo_id]
#         return '', 204
#
#     def put(self, todo_id):
#         args = parser.parse_args()
#         task = {'task': args['task']}
#         TODOS[todo_id] = task
#         return task, 201
#
#
# # TodoList
# # shows a list of all todos, and lets you POST to add new tasks
# class TodoList(Resource):
#     def get(self):
#         return TODOS
#
#     def post(self):
#         args = parser.parse_args()
#         todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
#         todo_id = 'todo%i' % todo_id
#         TODOS[todo_id] = {'task': args['task']}
#         return TODOS[todo_id], 201
#
# ##
# ## Actually setup the Api resource routing here
# ##
# api.add_resource(TodoList, '/todos')
# api.add_resource(Todo, '/todos/<todo_id>')


if __name__ == '__main__':
    app.run(debug=True)