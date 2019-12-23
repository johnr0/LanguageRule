from sanic import Sanic
from sanic.response import json, file, text
from nltk.corpus import wordnet as wn
import numpy as np

app = Sanic()

app.static('/bundle.js', 'dist/bundle.js')
#app.static('/', 'src')

@app.route('/')
async def index(request):
    return await file('dist/index.html')

# possible TODO ? we might need to add related parameters in the route...
@app.route('/<path:path>')
async def index2(request, path):
    return await file('dist/index.html')


def extract_examples(concept):
    hypo_list = []
    for i in concept.hyponyms():
        hypo_list.append(i.name())
    for i in concept.hyponyms():
        hypo_list = hypo_list + extract_examples(i)
    hypo_list = list(set(hypo_list))


    return hypo_list

def extract_examples_short(concept):
    hypo_list = []
    for i in concept.hyponyms():
        hypo_list.append(i.name())
    if len(hypo_list)>9:
      return list(set(hypo_list))
    for i in concept.hyponyms():
        hypo_list = hypo_list + extract_examples_short(i)
        if len(hypo_list)>9:
          break
    hypo_list = list(set(hypo_list))


    return hypo_list

def example_dist_sorted(concept, distance_words, short=False):
    if short==True:
        examples = extract_examples_short(concept)
    else:    
        examples = extract_examples(concept)
    hypo_dict = {}
    for hypo in examples:
        cur_h = wn.synset(hypo)
        dists = []
        for distance_word in distance_words:
            dists_sub=[]
            cur_ds = wn.synsets(distance_word)
            for cur_d in cur_ds:
                dist = cur_d.path_similarity(cur_h)
                # print(dist)
                if dist==None:
                    dist = 0
                dists_sub.append(dist)
            dists.append(np.max(dists_sub))
        hypo_dict[hypo]=np.mean(dists)

    to_return = sorted(hypo_dict, key=hypo_dict.get, reverse=False)
    # print(hypo_dict)
    # print(to_return)
    return to_return


def extract_candidate_common_parents(words):
  print('start extracting candidates!')
  result_common_hypernyms = []
  hypernym_dict = {}
  for idx1 in range(len(words)):
    for idx2 in range(idx1+1, len(words)):
      word_synsets1 = wn.synsets(words[idx1])
      word_synsets2 = wn.synsets(words[idx2])
      for word_synset1 in word_synsets1:
        for word_synset2 in word_synsets2:
          common_hypernyms = word_synset1.lowest_common_hypernyms(word_synset2)
          for common_hypernym in common_hypernyms:
            if common_hypernym.name() not in hypernym_dict:
              hypernym_dict[common_hypernym.name()]=set()
            hypernym_dict[common_hypernym.name()].add(word_synset1.name())
            hypernym_dict[common_hypernym.name()].add(word_synset2.name())  
          result_common_hypernyms = result_common_hypernyms + common_hypernyms
#   print(hypernym_dict)
  result_common_hypernyms = list(set(result_common_hypernyms))
  print(result_common_hypernyms)
#   print(result_common_hypernyms)


  to_return_common_hypernyms = result_common_hypernyms.copy()
  # for idx1 in range(len(result_common_hypernyms)):
  #   for idx2 in range(idx1+1, len(result_common_hypernyms)):
  #     word_synset1 = result_common_hypernyms[idx1]
  #     word_synset2 = result_common_hypernyms[idx2]
  #     if len(hypernym_dict[word_synset1.name()] & hypernym_dict[word_synset2.name()])>0:
  #       common_hypernyms = word_synset1.lowest_common_hypernyms(word_synset2)
  #       for common_hypernym in common_hypernyms:
  #         if common_hypernym.name()==word_synset1.name():
  #           if word_synset2 in to_return_common_hypernyms:
  #             to_return_common_hypernyms.remove(word_synset2)
  #         elif common_hypernym.name()==word_synset2.name():
  #           if word_synset1 in to_return_common_hypernyms:
  #             to_return_common_hypernyms.remove(word_synset1)
  #         else:
  #           if word_synset1 in to_return_common_hypernyms:
  #             to_return_common_hypernyms.remove(word_synset1)
  #           if word_synset2 in to_return_common_hypernyms:
  #             to_return_common_hypernyms.remove(word_synset2)
  #       print('from', word_synset1, word_synset2, 'result', common_hypernyms)
  #       to_return_common_hypernyms = to_return_common_hypernyms + common_hypernyms
  # to_return_common_hypernyms = list(set(to_return_common_hypernyms))

  data_dict = {}
  
  hypo_dict = {}
  for hypo in to_return_common_hypernyms:
    cur_h = hypo

    dists = []
    for distance_word in words:
      dists_sub=[]
      cur_ds = wn.synsets(distance_word)
      for cur_d in cur_ds:
        dist = cur_d.path_similarity(cur_h)
        # print(dist)
        if dist==None:
          dist = 0
        dists_sub.append(dist)
      dists.append(np.max(dists_sub))
    hypo_dict[hypo.name()]=np.mean(dists)
#   print(hypo_dict)
  to_return = sorted(hypo_dict, key=hypo_dict.get, reverse=True)
  print(to_return)

  return_dict_list = []
  for item in to_return:
    s=wn.synset(item)
    each_dict = {
        'name': s.name(),
        'definition': s.definition(),
        'examples': example_dist_sorted(s, words, True),
    }
    return_dict_list.append(each_dict)


  print(len(return_dict_list))
  return return_dict_list


@app.route('/query_wordnet_word', methods=["POST",])
def query_wordnet_word(request):
    print("result!")
    word = request.json['word']
    synset = wn.synsets(word)

    distance_words = [word]

    return_list = []
    for s in synset:
        each_dict = {
            'name': s.name(),
            'definition': s.definition(),
            'examples': example_dist_sorted(s, distance_words),
        }
        return_list.append(each_dict)
    return json({'query_result': return_list})

@app.route("/query_wordnet_hypernym", methods=["POST",])
def query_wordnet_hypernym(request):
    word = request.json['word']
    word = wn.synset(word)
    hypernyms = word.hypernyms()
    print(request.json)
    if 'example_words' in request.json:
        distance_words = request.json['example_words']
        distance_words.append(request.json['origin_word'])
    else:
        distance_words = [request.json['origin_word']]

    print(distance_words)

    return_list = []
    for s in hypernyms:
        each_dict = {
            'name': s.name(),
            'definition': s.definition(),
            'examples': example_dist_sorted(s, distance_words),
        }
        return_list.append(each_dict)
    return json({'query_result': return_list})

@app.route("/query_wordnet_resorted_examples", methods=["POST",])
def query_wordnet_resorted_examples(request):
    word_list = request.json['list']
    distance_words = request.json['example_words']
    distance_words.append(request.json['origin_word'])
    for idx1, sub_list in enumerate(word_list):
        for idx2, item in enumerate(sub_list):
            word = wn.synset(item['name'])
            new_example = example_dist_sorted(word, distance_words)
            word_list[idx1][idx2]['examples'] = new_example
    return json({"resorted_list": word_list})

@app.route("/query_wordnet_common_hypernym", methods=["POST",])
def query_wordnet_common_hypernym(request):
    words = request.json['words']
    return_list = extract_candidate_common_parents(words)
    return json({'query_result': return_list})




@app.route("/example_post", methods=["POST",])
def create_user(request):
    return text("POST data: %s" % request.body)

@app.route("/example_json")
def post_json(request):
    return json({ "received": True, "data": request.json })

@app.route("/query_string")
def query_string(request):
    return json({ "parsed": True, "args": request.args, "url": request.url,
                  "query_string": request.query_string })

@app.websocket('/ws_data')
async def feed(request, ws):
    while True:
        data = 'hello!'
        print('Sending: ' + data)
        await ws.send(data)
        data = await ws.recv()
        print('Received: ' + data)
