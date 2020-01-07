import React from 'react'

function SyntaxDefinitionRenderer(syntax){
    if(syntax=='acomp'){
        return (<p><b>acomp:</b> An adjectival complement of <span className='SyntaxHead'>a verb</span> is <span className='SyntaxTail'>an adjectival phrase</span> which functions as the complement (like an
            object of the verb).</p>)
    }else if(syntax=='advcl'){
        return (<p><b>advcl:</b> An adverbial clause modifier is <span className='SyntaxTail'>a clause</span> which modifies <span className='SyntaxHead'>a verb or other predicate (adjective, etc.)</span>, as a modifier not as a core complement.</p>)
    }else if(syntax=='advmod'){
        return (<p><b>advmod:</b> An adverb modifier of <span className='SyntaxHead'>a word</span> is <span className='SyntaxTail'>a (non-clausal) adverb or adverb-headed phrase</span> that serves to modify the meaning of the word.</p>)
    }else if(syntax=='agent'){
        return (<p><b>agent:</b> An agent is <span className='SyntaxTail'>the complement</span> of <span className='SyntaxHead'>a passive verb</span> which is <span className='SyntaxTail'>introduced by the preposition “by” and does the action</span>. This relation only appears in the collapsed dependencies, where it can replace prep by, where appropriate. It does not appear in basic dependencies output.</p>)
    }else if(syntax=='amod'){
        return (<p><b>amod:</b> An adjectival modifier of a noun phrase is <span className='SyntaxTail'>any adjectival phrase</span> that serves to modify the meaning of the <span className='SyntaxHead'>noun phrase</span>.</p>)
    }else if(syntax=='appos'){
        return (<p><b>appos:</b> An appositional modifier of a noun phrase is <span className='SyntaxTail'>a noun phrase</span> immediately to the right of <span className='SyntaxHead'>the first noun phrase</span> that serves to define or modify that <span className='SyntaxHead'>noun phrase</span>. It includes parenthesized examples, as well as defining abbreviations in one of these structures.</p>)
    }else if(syntax=='aux'){
        return (<p><b>aux:</b> An auxiliary of a clause is <span className='SyntaxTail'>a non-main verb</span> of the clause, e.g., a modal auxiliary, or a form of “be”, “do” or “have” in a periphrastic tense.</p>)
    }else if(syntax=='auxpass'){
        return (<p><b>auxpass:</b> A passive auxiliary of a clause is a <span className='SyntaxTail'>non-main verb</span> of the clause which contains the passive information.</p>)
    }else if(syntax=='cc'){
        return (<p><b>cc:</b> A coordination is the relation between <span className='SyntaxHead'>an element of a conjunct</span> and <span className='SyntaxTail'>the coordinating conjunction word of the conjunct</span>. (Note: different dependency grammars have different treatments of coordination. We take one conjunct of a conjunction (normally the first) as the head of the conjunction.) <span className='SyntaxTail'>A conjunction</span> may also appear at the beginning of a sentence. This is also called a cc, and dependent on the root predicate of the sentence</p>)
    }else if(syntax=='ccomp'){
        return (<p><b>ccomp:</b> A clausal complement of <span className='SyntaxHead'>a verb or adjective</span> is <span className='SyntaxTail'>a dependent clause with an internal subject which functions like an object of the verb, or adjective</span>. Clausal complements for <span className='SyntaxHead'>nouns</span> are limited to <span className='SyntaxTail'>complement clauses with a subset of nouns</span> like “fact” or “report”. We analyze them the same (parallel to the analysis of this class as “content clauses” in Huddleston and Pullum 2002). Such clausal complements are usually finite (though there are occasional remnant English subjunctives).</p>)
    }else if(syntax=='conj'){
        return (<p><b>conj:</b> A conjunct is the relation between two elements connected by a coordinating conjunction, such as “and”, “or”, etc. We treat conjunctions asymmetrically: <span className='SyntaxHead'>The head of the relation</span> is the first conjunct and <span className='SyntaxTail'>other conjunctions</span> depend on it via the conj relation.</p>)
    }else if(syntax=='cop'){
        return (<p><b>cop:</b> A copula is the relation between <span className='SyntaxHead'>the complement of a copular verb</span> and <span className='SyntaxTail'>the copular verb</span>. (We normally take <span className='SyntaxTail'>a copula</span> as a dependent of its complement.)</p>)
    }else if(syntax=='csubj'){
        return (<p><b>csubj:</b> A clausal subject is <span className='SyntaxTail'>a clausal syntactic subject</span> of <span className='SyntaxHead'>a clause</span>, i.e., <span className='SyntaxTail'>the subject</span> is itself a clause. <span className='SyntaxHead'>The governor</span> of this relation might not always be a verb: when the verb is a copular verb, the root of the clause is the complement of the copular verb.</p>)
    }else if(syntax=='csubjpass'){
        return (<p><b>csubjpass:</b> A clausal passive subject is <span className='SyntaxTail'>a clausal syntactic subject</span> of <span className='SyntaxHead'>a passive clause</span>.</p>)
    }else if(syntax=='dep'){
        return (<p><b>dep:</b> A dependency is labeled as dep when the system is unable to determine a more precise dependency relation between two words. This may be because of a weird grammatical construction, a limitation in the Stanford Dependency conversion software, a parser error, or because of an unresolved long distance dependency.</p>)
    }else if(syntax=='det'){
        return (<p><b>det:</b> A determiner is the relation between <span className='SyntaxHead'>the head of a noun phrase</span> and <span className='SyntaxTail'>its determiner</span>.</p>)
    }else if(syntax=='discourse'){
        return (<p><b>discourse:</b> This is used for <span className='SyntaxTail'>interjections and other discourse particles and elements</span> (which are not clearly linked to the structure of the sentence, except in an expressive way). We generally follow the guidelines of what the Penn Treebanks count as an INTJ. They define this to include: <span className='SyntaxTail'>interjections (oh, uh-huh, Welcome), fillers (um, ah), and discourse markers (well, like, actually, but not you know)</span>.</p>)
    }else if(syntax=='obj' || syntax=='dobj'){
        return (<p><b>obj:</b> The direct object of <span className='SyntaxHead'>a verb phrase</span> is <span className='SyntaxTail'>the noun phrase</span> which is the (accusative) object of <span className='SyntaxHead'>the verb</span>.</p>)
    }else if(syntax=='expl'){
        return (<p><b>expl:</b> This relation captures an existential <span className='SyntaxTail'>“there”</span>. <span className='SyntaxHead'>The main verb of the clause</span> is the governor</p>)
    }else if(syntax=='goeswith'){
        return (<p><b>goeswith:</b> This relation links two parts of a word that are separated in text that is not well edited. We follow the treebank: <span className='SyntaxTail'>The "goes with" part</span> is the dependent and the head is in some sense <span className='SyntaxHead'>the “main” part</span>, often the second part.</p>)
    }else if(syntax=='iobj'){
        return (<p><b>iobj:</b> The indirect object of <span className='SyntaxHead'>a verb phrase</span> is <span className='SyntaxTail'>the noun phrase</span> which is the (dative) object of the verb.</p>)
    }else if(syntax=='mark'){
        return (<p><b>mark:</b> A marker is <span className='SyntaxTail'>the word introducing a finite clause subordinate</span> to <span className='SyntaxHead'>another clause</span>. For <span className='SyntaxHead'>a complement clause</span>, this will typically be <span className='SyntaxTail'>“that” or “whether”</span>. For <span className='SyntaxHead'>an adverbial clause</span>, the marker is typically <span className='SyntaxTail'>a preposition like “while” or “although”</span>. <span className='SyntaxTail'>The mark</span> is a dependent of <span className='SyntaxHead'>the subordinate clause head</span>.</p>)
    }else if(syntax=='mwe'){
        return (<p><b>mew:</b> The multi-word expression (modifier) relation is used for certain multi-word idioms that behave like a single function word. It is used for a closed set of dependencies between words in common multi-word expressions for which it seems difficult or unclear to assign any other relationships. At present, this relation is used inside the following expressions: rather than, as well as, instead of, such as, because of, instead of, in addition to, all but, such as, because of, instead of, due to. The boundaries of this class are unclear; it could grow or shrink a little over time.</p>)
    }else if(syntax=='neg'){
        return (<p><b>neg:</b> The negation modifier is the relation between <span className='SyntaxTail'>a negation word</span> and <span className='SyntaxHead'>the word it modifies</span>.</p>)
    }else if(syntax=='nn'){
        return (<p><b>nn:</b> A noun compound modifier of a noun phrase is <span className='SyntaxTail'>any noun</span> that serves to modify <span className='SyntaxHead'>the head noun</span>. (Note that in the current system for dependency extraction, <span className='SyntaxTail'>all nouns</span> modify <span className='SyntaxHead'>the rightmost noun</span> of the noun phrase – there is no intelligent noun compound analysis. This is likely to be fixed once the Penn Treebank represents the branching structure of noun phrases.)</p>)
    }else if(syntax=='npadvmod' || syntax=='nmod:npmod'){
        return (<p><b>nmod:npmod:</b> This relation captures various places where something syntactically <span className='SyntaxTail'>a noun phrase</span> is used as an adverbial modifier in a sentence. These usages include: (i) <span className='SyntaxTail'>a measure phrase</span>, which is the relation between <span className='SyntaxHead'>the head of an adjective/adverb/prepositional phrase</span> and <span className='SyntaxTail'>the head of a measure phrase modifying the adjective/adverb phrase</span>; (ii) <span className='SyntaxTail'>noun phrases</span> giving an extent inside <span className='SyntaxHead'>a verb phrase</span> which are not objects; (iii) financial constructions involving <span className='SyntaxTail'>an adverbial or prepositional-phrase-like noun phrase</span>, notably the following construction $5 a share, where the second noun phrase means “per share”; (iv) floating reflexives; and (v) certain other absolutive noun phrase constructions. A temporal modifier (tmod) is a subclass of npadvmod which is distinguished as a separate relation.</p>)
    }else if(syntax=='nsubj'){
        return (<p><b>nsubj:</b> A nominal subject is <span className='SyntaxTail'>a noun phrase</span> which is <span className='SyntaxTail'>the syntactic subject</span> of <span className='SyntaxHead'>a clause</span>. <span className='SyntaxHead'>The governor</span> of this relation might not always be a verb: when the verb is a copular verb, the root of the clause is <span className='SyntaxHead'>the complement of the copular verb</span>, which can be an adjective or noun.</p>)
    }else if(syntax=='nsubjpass'){
        return (<p><b>nsubjpass:</b> A passive nominal subject is <span className='SyntaxTail'>a noun phrase</span> which is <span>the syntactic subject</span> of <span className='SyntaxHead'>a passive clause</span>.</p>)
    }else if(syntax=='num' || syntax=='nummod'){
        return (<p><b>num:</b> A numeric modifier of <span className='SyntaxHead'>a noun</span> is <span className='SyntaxTail'>any number phrase</span> that serves to modify the meaning of <span className='SyntaxHead'>the noun</span> with a quantity</p>)
    }else if(syntax=='number'){
        return (<p><b>number:</b> An element of compound number is a part of a number phrase or currency amount. We regard a number as a specialized kind of multi-word expression.</p>)
    }else if(syntax=='parataxis'){
        return (<p><b>parataxis:</b> The parataxis relation (from Greek for “place side by side”) is a relation between <span className='SyntaxHead'>the main verb of a clause</span> and <span className='SyntaxTail'>other sentential elements</span>, such as a sentential parenthetical, a clause after a “:” or a “;”, or two sentences placed side by side without any explicit coordination or subordination.</p>)
    }else if(syntax=='pcomp'){
        return (<p><b>pcomp:</b> This is used when the complement of <span className='SyntaxlHead'>a preposition</span> is <span className='SyntaxTail'>a clause or prepositional phrase (or occasionally, an adverbial phrase)</span>. The prepositional complement of <span className='SyntaxHead'>a preposition</span> is <span className='SyntaxTail'>the head of a clause following the preposition, or the preposition head of the following prepositional phrase</span>.</p>)
    }else if(syntax=='pobj'){
        return (<p><b>pobj:</b> The object of <span className='SyntaxHead'>a preposition</span> is <span className='SyntaxTail'>the head of a noun phrase following the preposition, or the adverbs “here” and “there”</span>. (The preposition in turn may be modifying a noun, verb, etc.) Unlike the Penn Treebank, we here define cases of VBG (gerund or present particle verb) quasi-prepositions like <span className='SyntaxTail'>“including”, “concerning”, etc.</span> as instances of pobj. (The preposition can be tagged as foreign word for “pace”, “versus”, etc. It can also be called a coordinating conjunction – but we don’t currently handle that and would need to distinguish from conjoined prepositions.) In the case of preposition stranding, the object can precede the preposition (e.g., “What does CPR stand for?”).</p>)
    }else if(syntax=='poss' || syntax=='nmod:poss'){
        return (<p><b>nmod:poss:</b> The possession modifier relation holds between <span className='SyntaxHead'>the head of a noun phrase</span> and <span className='SyntaxTail'>its possessive determiner, or a genitive ’s complement</span>.</p>)
    }else if(syntax=='possessive'){
        return (<p><b>possessive:</b> The possessive modifier relation appears between <span className='SyntaxHead'>the head of a noun phrase</span> and <span className='SyntaxTail'>the genitive ’s.</span></p>)
    }else if(syntax=='preconj' || syntax=='cc:preconj'){
        return (<p><b>preconj:</b> A preconjunct is the relation between <span className='SyntaxHead'>the head of a noun phrase</span> and <span className='SyntaxTail'>a word that appears at the beginning bracketing a conjunction</span> (and puts emphasis on it), such as “either”, “both”, “neither”)</p>)
    }else if(syntax=='predet'){
        return (<p><b>predet:</b> A predeterminer is the relation between <span className='SyntaxHead'>the head of a noun phrase</span> and <span className='SyntaxTail'>a word that precedes and modifies the meaning of the noun phrase determiner</span>.</p>)
    }else if(syntax=='prep'){
        return (<p><b>prep:</b> A prepositional modifier of <span className='SyntaxHead'>a verb, adjective, or noun</span> is <span className='SyntaxTail'>any prepositional phrase that serves to modify the meaning of the verb, adjective, noun, or even another prepositon</span>. In the collapsed representation, this is used only for prepositions with noun phrase complements.</p>)
    }else if(syntax=='prepc'){
        return (<p><b>prepc:</b> In the collapsed representation, a prepositional clausal modifier of <span className='SyntaxHead'>a verb, adjective, or noun</span> is <span className='SyntaxTail'>a clause introduced by a preposition which serves to modify the meaning of the verb, adjective, or noun.</span></p>)
    }else if(syntax=='prt' || syntax=='compound:prt'){
        return (<p><b>prt:</b> The phrasal verb particle relation identifies a phrasal verb, and holds between <span className='SyntaxHead'>the verb</span> and <span className='SyntaxTail'>its particle</span>.</p>)
    }else if(syntax=='punct'){
        return (<p><b>punct:</b> This is used for <span className='SyntaxTail'>any piece of punctuation</span> in a clause, if punctuation is being retained in the typed dependencies. By default, punctuation is not retained in the output.</p>)
    }else if(syntax=='quantmod'){
        return (<p><b>quantmod:</b> A quantifier modifier is <span className='SyntaxTail'>an element</span> modifying <span className='SyntaxHead'>the head of a quantifier phrase constituent</span>. (These are modifiers in complex numeric quantifiers, not other types of “quantification”. Quantifiers like “all” become det.)</p>)
    }else if(syntax=='rcmod' || syntax=='acl:relcl'){
        return (<p><b>acl:relcel:</b> A relative clause modifier of <span className='SyntaxHead'>a noun phrase</span> is <span className='SyntaxTail'>a relative clause</span> modifying <span className='SyntaxHead'>the noun phrase</span>. The relation points from <span className='SyntaxHead'>the head noun of the noun phrase</span> to <span className='SyntaxTail'>the head of the relative clause</span>, normally a verb.</p>)
    }else if(syntax=='ref'){
        return (<p><b>ref:</b> A referent of <span className='SyntaxHead'>the head of a noun phrase</span> is <span className='SyntaxTail'>the relative word introducing the relative clause</span> modifying <span className='SyntaxHead'>the noun phrase</span>.</p>)
    }else if(syntax=='root'){
        return (<p><b>root:</b> The root grammatical relation points to the root of the sentence. <span className='SyntaxHead'>A fake node “ROOT”</span> is used as the governor.</p>)
    }else if(syntax=='tmod'){
        return (<p><b>tmod:</b> A temporal modifier of <span className='SyntaxHead'>a verb phrase, noun phrase, or an adjective phrase</span> is <span className='SyntaxTail'>a bare noun phrase constituent that serves to modify the meaning of the constituent by specifying a time</span>. (Other temporal modifiers are prepositional phrases and are introduced as prep.)</p>)
    }else if(syntax=='vmod'){
        return (<p><b>vmod:</b> A reduced non-finite verbal modifier is <span className='SyntaxTail'>a participial or infinitive form of a verb</span> heading a phrase (which may have some arguments, roughly like a verb phrase). These are used to modify the meaning of <span className='SyntaxHead'>a noun phrase or another verb</span>. They are not core arguments of a verb or full finite relative clauses.</p>)
    }else if(syntax=='xcomp'){
        return (<p><b>xcomp:</b> An open clausal complement (xcomp) of <span className='SyntaxHead'>a verb or an adjective</span> is <span className='SyntaxTail'>a predicative or clausal complement without its own subject</span>. The reference of the subject is necessarily determined by an argument external to the xcomp (normally by the object of the next higher clause, if there is one, or else by the subject of the next higher clause). These complements are always non-finite, and they are complements (arguments of the higher verb or adjective) rather than adjuncts/modifiers, such as a purpose clause. The name xcomp is borrowed from Lexical-Functional Grammar</p>)
    }else if(syntax=='xsubj'){
        return (<p><b>xsubj:</b> A controlling subject is the relation between <span className='SyntaxHead'>the head of a open clausal complement (xcomp)</span> and <span className='SyntaxTail'>the external subject of that clause</span>. This is an additional dependency, not a basic depedency.</p>)
    }else if(syntax=='nmod'){
        return (<p>nmod:<b></b> The nmod relation is used for <span className='SyntaxTail'>nominal modifiers</span> of <span className='SyntaxHead'>nouns or clausal predicates</span>. nmod is <span className='SyntaxTail'>a noun functioning as a non-core (oblique) argument or adjunct</span>. In English, nmod is used for prepositional complements (including datives and partitives).</p>)
    }else if(syntax=='acl'){
        return (<p><b>acl:</b> acl is used for <span className='SyntaxTail'>finite and non-finite clauses</span> that modify <span className='SyntaxHead'>a noun</span></p>)
    }else if(syntax=='case'){
        return (<p><b>case:</b> The case relation is used for <span className='SyntaxTail'>any preposition</span> in English. <span className='SyntaxTail'>Prepositions</span> are treated as <span className='SyntaxHead'>dependents of the noun they attach to</span> or introduce in an “extended nominal projection”.</p>)
    }else if(syntax=='compound'){
        return (<p><b>compound:</b> compound is used for noun compounds, number compounds, adjectival compounds, and imitative reduplication.</p>)
    }else if(syntax==''){
        return (<p><b>:</b> </p>)
    }else if(syntax==''){
        return (<p><b>:</b> </p>)
    }else{
        return (<p>Nothing is found for this dependency.</p>)
    }
}

export default SyntaxDefinitionRenderer