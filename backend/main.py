from sanic import Sanic
from sanic.response import json, file, text
from nltk.corpus import wordnet as wn
import numpy as np
import stanfordnlp
import nltk
from nltk.stem import WordNetLemmatizer
from empath import Empath


nlp = stanfordnlp.Pipeline()
wordtags = nltk.ConditionalFreqDist((w.lower(), t) for w, t in nltk.corpus.brown.tagged_words(tagset="universal"))
Lemmatizer = WordNetLemmatizer()
emp = Empath()

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

@app.route('/query_pos', methods=["POST"],)
def query_pos(request):
  word = request.json['word']
  pos_list = list(wordtags[word])
  print(pos_list)

  wnword = wn.synsets(word)

  for w in wnword:
    cur_pos = w.pos()
    if cur_pos=='n':
      pos_list.append('NOUN')
    elif cur_pos=='v':
      pos_list.append('VERB')
    elif cur_pos=='a':
      pos_list.append('ADJ')
    elif cur_pos=='r':
      pos_list.append('ADV')
  pos_list = list(set(pos_list))


  return json({'query_result': pos_list})

@app.route('/query_empath_examples', methods=["POST"],)
def query_empath_examples(request):
  words_passed = request.json['words']
  pos = request.json['pos']
  name = words_passed[len(words_passed)-1]+'_similar'
  examples = emp.create_category(name, words_passed)
  examples_in_pos = []
  for example in examples:
    pos_list = list(wordtags[example])
    wnword = wn.synsets(example)
    for w in wnword:
      cur_pos = w.pos()
      if cur_pos=='n':
        pos_list.append('NOUN')
      elif cur_pos=='v':
        pos_list.append('VERB')
      elif cur_pos=='a':
        pos_list.append('ADJ')
      elif cur_pos=='r':
        pos_list.append('ADV')
    pos_list = list(set(pos_list))
    if pos in pos_list:
      if pos=='VERB':
        examples_in_pos.append(Lemmatizer.lemmatize(example.lower(), pos='v'))
      elif pos=='NOUN':
        examples_in_pos.append(Lemmatizer.lemmatize(example.lower(), pos='n'))
      elif pos=='ADJ':
        examples_in_pos.append(Lemmatizer.lemmatize(example.lower(), pos='a'))
      elif pos=='ADV':
        examples_in_pos.append(Lemmatizer.lemmatize(example.lower(), pos='r'))
      else:
        examples_in_pos.append(example.lower())
  examples_in_pos = words_passed+examples_in_pos
  examples_in_pos = list(set(examples_in_pos))

  return json({'query_result': examples_in_pos})


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

def concept_dfs(cur_concept, path, target_concept):
  # print(cur_concept, path)
  if target_concept.name()==cur_concept.name():
    path.append(cur_concept)
    return path
  elif len(cur_concept.hypernyms())>0:
    cur_results = []
    arg_min_list = []
    for hyper in cur_concept.hypernyms():
      path.append(cur_concept)
      # print(path_)
      result = concept_dfs(hyper, path, target_concept)
      # print(result)
      if len(result)!=0:
        cur_results.append(result)
        arg_min_list.append(len(result))
    if len(cur_results)>0:
      # print('cur_results', cur_results)
      return cur_results[np.argmin(arg_min_list)]
    
    # print('went through all')  
    return []
  else: 
    return []


def find_concept_path(init_word, examples, choosen_word):
  examples.append(init_word)
  init_word_synsets = wn.synsets(init_word)
  choosen_word_synset = wn.synset(choosen_word)
  return_list = []
  item_dict= {}
  for init_word_synset in init_word_synsets:
    dist = init_word_synset.path_similarity(choosen_word_synset)
    # print(dist)
    if dist!=None:
      result = concept_dfs(init_word_synset, [], choosen_word_synset)
      if len(result)>0:
        # print(result)
        single_list = []
        for r in result:
          single_list.append(r.name())
          if r.name() not in item_dict:
            item_dict[r.name()] = {
                'name':r.name(),
                'definition':r.definition(),
                'examples': example_dist_sorted(r,examples),
            }

        while len(r.hypernyms())!=0:
            r = r.hypernyms()[0]
            single_list.append(r.name())
            if r.name() not in item_dict:
                item_dict[r.name()] = {
                    'name':r.name(),
                    'definition':r.definition(),
                    'examples': example_dist_sorted(r,examples),
                }
        return_list.append(single_list)
  # print(return_list)
  # print(item_dict)

  return return_list, item_dict

@app.route("/query_wordnet_common_hypernym_path", methods=["POST",])
def query_wordnet_common_hypernym_path(request):
    
    init_word = request.json['init_word']
    examples = request.json['examples']
    choosen_word = request.json['choosen_word']
    # choosen_word = 
    # find_concept_path()
    return_list, item_dict = find_concept_path(init_word, examples, choosen_word)

    return json({'return_result': return_list, 'item_dict': item_dict})



def return_dependency(words, selected_indexes, original_text):
  doc = nlp(original_text)

  indexes={}
  cur_order = 0
  for idx1, sentence in enumerate(doc.sentences):
    for idx2, word in enumerate(sentence.words):
      if word.pos not in ['.', ',']:
        indexes[str(idx1)+'_'+str(idx2)]=cur_order
        cur_order = cur_order+1
  print(indexes)
  dependencies = []
  for sen_idx, sentence in enumerate(doc.sentences):
    for dependency in sentence.dependencies:
      or_cur_idx = str(sen_idx)+'_'+str(int(dependency[0].index)-1)
      or_head_idx = str(sen_idx)+'_'+str(int(dependency[2].index)-1)
      if or_cur_idx in indexes and or_head_idx in indexes:
        cur_idx = indexes[or_cur_idx]
        head_idx = indexes[or_head_idx]
        if cur_idx in selected_indexes and head_idx in selected_indexes:
          dep_dic = {
              'head': cur_idx,
              'word': head_idx,
              'dependency':dependency[1]
          }
        #   print(dep_dic)
          dependencies.append(dep_dic)
  return dependencies

@app.route("/query_dependency_original_text", methods=["POST",])
def query_dependency_original_text(request):
    
    words = request.json['words']
    selected_indexes = request.json['selected_indexes']
    original_text = request.json['original_text']
    dependencies = return_dependency(words, selected_indexes, original_text)

    return json({'dependencies': dependencies})

@app.route("/query_dependencies_from_examples", methods=["POST",])
def query_dependencies_from_examples(request):
    examples = request.json['examples']
    query_results = []
    for example in examples:
      words = example['words']
      selected_indexes = example['selected_indexes']
      original_text = example['original_text']
      dependencies = return_dependency(words, selected_indexes, original_text)
      query_results.append(dependencies[0]['dependency'])
    dependency = max(query_results, key=query_results.count)

    return json({'dependency': dependency})

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
