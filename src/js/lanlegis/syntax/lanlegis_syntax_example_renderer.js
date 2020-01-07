import React from 'react';

function SyntaxExampleRenderer(syntax){
    if(syntax=='acomp'){
        return (<div>
            <p>She <span className='SyntaxHead'>looks</span> very <span className='SyntaxTail'>beautiful</span></p>
        </div>)
    }else if(syntax=='advcl'){
        return (<div>
            <p>The accident <span className='SyntaxHead'>happened</span> as the night was <span className='SyntaxTail'>falling</span></p>
            <p>If you <span className='SyntaxTail'>know</span> who did it, you should <span className='SyntaxHead'>tell</span> the teacher</p>
            <p>He <span className='SyntaxHead'>talked</span> to him in order to <span className='SyntaxTail'>secure</span> the account</p>
            <p>He was <span className='SyntaxHead'>upset</span> when I <span className='SyntaxTail'>talked</span> to him</p>
            <p>They <span className='SyntaxHead'>heard</span> about you <span className='SyntaxTail'>missing</span> classes</p>
        </div>)
    }else if(syntax=='advmod'){
        return (<div>
            <p><span className='SyntaxTail'>Genetically</span> <span className='SyntaxHead'>modified</span> food</p>
            <p><span className='SyntaxTail'>less</span> <span className='SyntaxHead'>often</span></p>
        </div>)
    }else if(syntax=='agent'){
        return (<div>
            <p>The man has been <span className='SyntaxHead'>killed</span> by the <span className='SyntaxTail'>police</span>”</p>
            <p>Effects <span className='SyntaxHead'>caused</span> by the <span className='SyntaxTail'>protein</span> are important</p>
        </div>)
    }else if(syntax=='amod'){
        return (<div>
            <p>Sam eats <span className='SyntaxTail'>red</span> <span className='SyntaxHead'>meat</span></p>
            <p>Sam took out a 3 million <span className='SyntaxTail'>dollar</span> <span className='SyntaxHead'>loan</span></p>
            <p>Sam took out a <span className='SyntaxTail'>$</span> 3 million <span className='SyntaxHead'>loan</span></p>
            <p><span className='SyntaxHead'>Anything</span> <span className='SyntaxTail'>else</span> for me ?</p>
            <p>We can go <span className='SyntaxHead'>somewhere</span> <span className='SyntaxTail'>nice</span>.</p>
        </div>)
    }else if(syntax=='appos'){
        return (<div>
            <p><span className='SyntaxHead'>Sam</span>, my <span className='SyntaxTail'>brother</span>, arrived</p>
            <p><span className='SyntaxHead'>Bill</span> (John ’s <span className='SyntaxTail'>cousin</span>)</p>
            <p>The Australian Broadcasting <span className='SyntaxHead'>Corporation</span> (<span className='SyntaxTail'>ABC</span>)</p>
        </div>)
    }else if(syntax=='aux'){
        return (<div>
            <p>Reagan <span className='SyntaxTail'>has</span> <span className='SyntaxHead'>died</span></p>
            <p>He <span className='SyntaxTail'>should</span> <span className='SyntaxHead'>leave</span></p>
        </div>)
    }else if(syntax=='auxpass'){
        return (<div>
            <p>Kennedy has <span className='SyntaxTail'>been</span> <span className='SyntaxHead'>killed</span></p>
            <p>Kennedy <span className='SyntaxTail'>was/got</span> <span className='SyntaxHead'>killed</span></p>
        </div>)
    }else if(syntax=='cc'){
        return (<div>
            <p>Bill is <span className='SyntaxHead'>big</span> <span className='SyntaxTail'>and</span> honest</p>
            <p>They either <span className='SyntaxHead'>ski</span> <span className='SyntaxTail'>or</span> snowboard</p>
            <p><span className='SyntaxTail'>And</span> then we <span className='SyntaxHead'>left</span>.</p>
        </div>)
    }else if(syntax=='ccomp'){
        return (<div>
            <p>He <span className='SyntaxHead'>says</span> that you <span className='SyntaxTail'>like</span> to swim”</p>
            <p>I am <span className='SyntaxHead'>certain</span> that he <span className='SyntaxTail'>did</span> it</p>
            <p>The boss <span className='SyntaxHead'>said</span> to <span className='SyntaxTail'>start</span> digging</p>
            {/* <p>I admire the <span className='SyntaxHead'>fact</span> that you are <span className='SyntaxTail'>honest</span></p> */}
        </div>)
    }else if(syntax=='acl'){
        return (<div>
            <p>the issues as he sees them</p>
            
        </div>)
    }else if(syntax=='conj'){
        return (<div>
            <p>Bill is <span className='SyntaxHead'>big</span> and <span className='SyntaxTail'>honest</span></p>
            <p>They either <span className='SyntaxHead'>ski</span> or <span className='SyntaxTail'>snowboard</span></p>
        </div>)
    }else if(syntax=='cop'){
        return (<div>
            <p>Bill <span className='SyntaxTail'>is</span> <span className='SyntaxHead'>big</span></p>
            <p>Bill <span className='SyntaxTail'>is</span> an honest <span className='SyntaxHead'>man</span></p>
        </div>)
    }else if(syntax=='csubj'){
        return (<div>
            <p>What she <span className='SyntaxTail'>said</span> <span className='SyntaxHead'>makes</span> sense</p>
            <p>What she <span className='SyntaxTail'>said</span> is not <span className='SyntaxHead'>true</span>”</p>
        </div>)
    }else if(syntax=='csubjpass'){
        return (<div>
            <p>That she <span className='SyntaxTail'>lied</span> was <span className='SyntaxHead'>suspected</span> by everyone</p>
        </div>)
    }else if(syntax=='dep'){
        return (<div>
            <p>Then, as <span className='SyntaxTail'>if</span> to <span className='SyntaxHead'>show</span> that he could, . . .</p>
        </div>)
    }else if(syntax=='det'){
        return (<div>
            <p><span className='SyntaxTail'>The</span> <span className='SyntaxHead'>man</span> is here</p>
            <p><span className='SyntaxTail'>Which</span> <span className='SyntaxHead'>book</span> do you prefer?</p>
            <p><span className='SyntaxHead'>You</span> 've <span className='SyntaxTail'>all</span> won !</p>
        </div>)
    }else if(syntax=='discourse'){
        return (<div>
            <p>Iguazu <span className='SyntaxHead'>is</span> in Argentina <span className='SyntaxTail'>:)</span></p>
        </div>)
    }else if(syntax=='obj' || syntax=='dobj'){
        return (<div>
            <p>She <span className='SyntaxHead'>gave</span> me a <span className='SyntaxTail'>raise</span>”</p>
            <p>They <span className='SyntaxHead'>win</span> the <span className='SyntaxTail'>lottery</span></p>
        </div>)
    }else if(syntax=='expl'){
        return (<div>
            <p><span className='SyntaxTail'>There</span> <span className='SyntaxHead'>is</span> a ghost in the room</p>
        </div>)
    }else if(syntax=='goeswith'){
        return (<div>
            <p>They come here <span className='SyntaxTail'>with</span> <span className='Syntaxhead'>out</span> legal permission</p>
        </div>)
    }else if(syntax=='iobj'){
        return (<div>
            <p>She <span className='SyntaxHead'>gave</span> <span className='SyntaxTail'>me</span> a raise</p>
        </div>)
    }else if(syntax=='mark'){
        return (<div>
            <p>Forces engaged in fighting <span className='SyntaxTail'>after</span> insurgents <span className='SyntaxHead'>attacked</span></p>
            <p>He says <span className='SyntaxTail'>that</span> you like to <span className='SyntaxHead'>swim</span></p>
        </div>)
    }else if(syntax=='mwe'){
        return (<div>
            <p>I like dogs <span className='SyntaxTail'>as</span> <span className='SyntaxHead'>well</span> as cats</p>
            <p>I like dogs as <span className='SyntaxHead'>well</span> <span className='SyntaxTail'>as</span> cats</p>
            <p>He cried <span className='SyntaxTail'>because</span> <span className='SyntaxHead'>of</span> you</p>
        </div>)
    }else if(syntax=='neg'){
        return (<div>
            <p>Bill is <span className='SyntaxTail'>not</span> a <span className='SyntaxHead'>scientist</span></p>
            <p>Bill does<span className='SyntaxTail'>n’t</span> <span className='SyntaxHead'>drive</span></p>
            <p>John saw <span className='SyntaxTail'>no</span> <span className='SyntaxHead'>accidents</span></p>
        </div>)
    }else if(syntax=='nn'){
        return (<div>
            <p><span className='SyntaxTail'>Oil</span> price <span className='SyntaxHead'>futures</span></p>
            <p>Oil <span className='SyntaxTail'>price</span> <span className='SyntaxHead'>futures</span></p>
        </div>)
    }else if(syntax=='npadvmod' || syntax=='nmod:npmod'){
        return (<div>
            <p>The director is 65 <span className='SyntaxTail'>years</span> <span className='SyntaxHead'>old</span></p>
            <p>6 <span className='SyntaxTail'>feet</span> <span className='SyntaxHead'>long</span></p>
            <p>Shares <span className='SyntaxHead'>eased</span> a <span className='SyntaxTail'>fraction</span></p>
            <p>IBM earned <span className='SyntaxHead'>$</span> 5 a <span className='SyntaxTail'>share</span></p>
            <p>The silence is <span className='SyntaxTail'>itself</span> <span className='SyntaxHead'>significant</span></p>
            <p>90% of Australians <span className='SyntaxHead'>like</span> him, the <span className='SyntaxTail'>most</span> of any country</p>
        </div>)
    }else if(syntax=='nsubj'){
        return (<div>
            <p><span className='SyntaxTail'>Clinton</span> <span className='SyntaxHead'>defeated</span> Dole</p>
            <p>The <span className='SyntaxTail'>baby</span> is <span className='SyntaxHead'>cute</span></p>
        </div>)
    }else if(syntax=='nsubjpass'){
        return (<div>
            <p><span className='SyntaxTail'>Dole</span> was <span className='SyntaxHead'>defeated</span> by Clinton</p>
        </div>)
    }else if(syntax=='num' || syntax=='nummod'){
        return (<div>
            <p>Sam ate <span className='SyntaxTail'>3</span> <span className='SyntaxHead'>sheep</span>”</p>
            <p>Sam spent <span className='SyntaxTail'>forty</span> <span className='SyntaxHead'>dollars</span></p>
            <p>Sam spent <span className='SyntaxHead'>$</span> <span className='SyntaxTail'>40</span>”</p>
        </div>)
    }else if(syntax=='number'){
        return (<div>
            <p>I have <span className='SyntaxTail'>four</span> <span className='SyntaxHead'>thousand</span> sheep</p>
            <p>I lost $ <span className='SyntaxTail'>3.2</span> <span className='SyntaxHead'>billion</span></p>
        </div>)
    }else if(syntax=='parataxis'){
        return (<div>
            <p>The guy, John <span className='SyntaxTail'>said</span>, <span className='SyntaxHead'>left</span> early in the morning</p>
            <p><span className='SyntaxHead'>Let</span>’s face it we’re <span className='SyntaxTail'>annoyed</span></p>
        </div>)
    }else if(syntax=='pcomp'){
        return (<div>
            <p>We have no information <span className='SyntaxHead'>on</span> whether users <span className='SyntaxTail'>are</span> at risk</p>
            <p>They heard <span className='SyntaxHead'>about</span> you <span className='SyntaxTail'>missing</span> classes</p>
        </div>)
    }else if(syntax=='pobj'){
        return (<div>
            <p>I sat <span className='SyntaxHead'>on</span> the <span className='SyntaxTail'>chair</span></p>
        </div>)
    }else if(syntax=='poss' || syntax=='nmod:poss'){
        return (<div>
            <p><span className='SyntaxTail'>their</span> <span className='SyntaxHead'>offices</span></p>
            <p><span className='SyntaxTail'>Bill</span>’s <span className='SyntaxHead'>clothes</span></p>
        </div>)
    }else if(syntax=='possessive'){
        return (<div>
            <p><span className='SyntaxHead'>Bill</span><span className='SyntaxTail'>’s</span> clothes”</p>
        </div>)
    }else if(syntax=='preconj' || syntax=='cc:preconj'){
        return (<div>
            <p><span className='SyntaxTail'>Both</span> the <span className='SyntaxHead'>boys</span> and the girls are here</p>
        </div>)
    }else if(syntax=='predet' || syntax=='det:predet'){
        return (<div>
            <p><span className='SyntaxTail'>All</span> the <span className='SyntaxHead'>boys</span> are here</p>
        </div>)
    }else if(syntax=='prep'){
        return (<div>
            <p>I saw a <span className='SyntaxHead'>cat</span> <span className='SyntaxTail'>in</span> a hat</p>
            <p>I <span className='SyntaxHead'>saw</span> a cat <span className='SyntaxTail'>with</span> a telescope</p>
            <p>He is <span className='SyntaxHead'>responsible</span> <span className='SyntaxTail'>for</span> meals</p>
        </div>)
    }else if(syntax=='prepc'){
        return (<div>
            <p>He <span className='SyntaxHead'>purchased</span> it without <span className='SyntaxTail'>paying</span> a premium</p>
        </div>)
    }else if(syntax=='prt' || syntax=='compound:prt'){
        return (<div>
            <p>They <span className='SyntaxHead'>shut</span> <span className='SyntaxTail'>down</span> the station”</p>
        </div>)
    }else if(syntax=='punct'){
        return (<div>
            <p><span className='SyntaxHead'>Go</span> home<span className='SyntaxTail'>!</span></p>
        </div>)
    }else if(syntax=='quantmod'){
        return (<div>
            <p><span className='SyntaxTail'>About</span> <span className='SyntaxHead'>200</span> people came to the party</p>
        </div>)
    }else if(syntax=='rcmod' || syntax=='acl:relcl'){
        return (<div>
            <p>I saw the <span className='SyntaxHead'>man</span> you <span className='SyntaxTail'>love</span></p>
            <p>I saw the <span className='SyntaxHead'>book</span> which you <span className='SyntaxTail'>bought</span></p>
        </div>)
    }else if(syntax=='ref'){
        return (<div>
            <p>I saw the <span className='SyntaxHead'>book</span> <span className='SyntaxTail'>which</span> you bought</p>
        </div>)
    }else if(syntax=='root'){
        return (<div>
            <p>I <span className='SyntaxTail'>love</span> French fries</p>
            <p>Bill is an honest <span className='SyntaxTail'>man</span></p>
        </div>)
    }else if(syntax=='tmod' || syntax=='nmod:tmod'){
        return (<div>
            <p>Last <span className='SyntaxTail'>night</span>, I <span className='SyntaxHead'>swam</span> in the pool</p>
            <p>Last <span className='SyntaxTail'>week</span>, I <span className='SyntaxHead'>read</span> a book</p>
            <p>We <span className='SyntaxHead'>go</span> to the same place every <span className='SyntaxTail'>year</span></p>
        </div>)
    }else if(syntax=='vmod' || syntax=='acl'){
        return (<div>
            <p><span className='SyntaxHead'>Points</span> to <span className='SyntaxTail'>establish</span> are...</p>
            <p>I don’t have <span className='SyntaxHead'>anything</span> to <span className='SyntaxTail'>say</span> to you</p>
            {/* <p><span className='SyntaxHead'>Truffles</span> <span className='SyntaxTail'>picked</span> during the spring are tasty</p>
            <p>Bill tried to <span className='SyntaxHead'>shoot</span>, <span className='SyntaxTail'>demonstrating</span> his incompetence</p> */}
        </div>)
    }else if(syntax=='xcomp'){
        return (<div>
            <p>He says that you <span className='SyntaxHead'>like</span> to <span className='SyntaxTail'>swim</span></p>
            <p>Sue <span className='SyntaxHead'>asked</span> George to <span className='SyntaxTail'>respond</span> to her offer</p>
            <p>I <span className='SyntaxHead'>consider</span> him a <span className='SyntaxTail'>fool</span></p>
            <p>I <span className='SyntaxHead'>consider</span> him <span className='SyntaxTail'>honest</span></p>
        </div>)
    }else if(syntax=='xsubj'){
        return (<div>
            <p><span className='SyntaxTail'>Tom</span> likes to <span className='SyntaxHead'>eat</span> fish</p>
        </div>)
    }else if(syntax=='nmod'){
        return (<div>
            <p>the <span className='SyntaxHead'>office</span> of the <span className='SyntaxTail'>Chair</span></p>
            <p><span className='SyntaxHead'>give</span> the toys to the <span className='SyntaxTail'>children</span></p>
            <p><span className='SyntaxHead'>some</span> of the <span className='SyntaxTail'>toys</span></p>
        </div>)
    }else if(syntax=='acl'){
        return (<div>
            <p>the <span className='SyntaxHead'>issues</span> as he <span className='SyntaxTail'>sees</span> them</p>
            <p><span className='SyntaxHead'>Points</span> to <span className='SyntaxTail'>establish</span> are ...</p>
            <p>I don't have <span className='SyntaxHead'>anything</span> to <span className='SyntaxTail'>say</span> to you</p>
        </div>)
    }else if(syntax=='case'){
        return (<div>
            <p>I saw a cat <span className='SyntaxTail'>in</span> a <span className='SyntaxHead'>hat</span></p>
            <p>I saw a cat <span className='SyntaxTail'>with</span> a <span className='SyntaxHead'>telescope</span></p>
            <p>He is responsible <span className='SyntaxTail'>for</span> <span className='SyntaxHead'>meals</span></p>
            <p>The <span className='SyntaxHead'>school</span><span className='SyntaxTail'>'s</span> grounds</p>
        </div>)
    }else if(syntax=='compound'){
        return (<div>
            <p><span className='SyntaxTail'>Oil</span> price <span className='SyntaxHead'>futures</span></p>
            <p>Oil <span className='SyntaxTail'>price</span> <span className='SyntaxHead'>futures</span></p>
            <p>I have <span className='SyntaxTail'>four</span> <span className='SyntaxHead'>thousand</span> sheep</p>
            <p>I lost $ <span className='SyntaxTail'>3.2</span> <span className='SyntaxHead'>billion</span></p>
            <p>a <span className='SyntaxTail'>medium</span> - <span className='SyntaxHead'>large</span> company</p>
        </div>)
    }else if(syntax==''){
        return (<div>
            <p></p>
        </div>)
    }

}

export default SyntaxExampleRenderer;