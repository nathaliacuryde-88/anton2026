/**
 * Interpretation copy, in English, Brazilian Portuguese and German.
 *
 * Written for a baby: warm, plain, and free of doom. Sign entries cover all
 * twelve so the app still reads correctly if the birth data is ever changed.
 *
 * Two voices are deliberately kept apart. The sign readings below are used
 * only by the Portrait letter, which is addressed to Anton, so they are
 * written in the second person. Everything shared with the other screens —
 * body and house meanings — is phrased without a pronoun at all, so it reads
 * correctly both in the letter and in a list about him.
 */

import { AspectKey, Bilingual, BodyKey, Element, Modality } from '../astro/constants';

type BySign = Bilingual[]; // indexed 0 = Aries .. 11 = Pisces

/** The Sun: the core self, the thing that keeps shining. */
export const SUN_IN_SIGN: BySign = [
  {
    en: 'A first-born flame. You start things, you say what you mean, and you would rather try and tumble than sit and wonder.',
    pt: 'Uma chama primeira. Você começa as coisas, fala o que pensa, e prefere tentar e cair a ficar sentado imaginando.',
    de: 'Eine Flamme, die zuerst da ist. Du fängst Dinge an, sagst was du meinst, und probierst lieber und stolperst, als still zu sitzen und zu grübeln.',
  },
  {
    en: 'Rooted and unhurried. You gather comfort around you — familiar smells, a favourite blanket, people who stay — and you hold on with quiet strength.',
    pt: 'Enraizado e sem pressa. Você junta conforto ao seu redor — cheiros conhecidos, o cobertor preferido, gente que fica — e segura firme com uma força silenciosa.',
    de: 'Verwurzelt und ohne Eile. Du sammelst Geborgenheit um dich herum — vertraute Gerüche, eine Lieblingsdecke, Menschen, die bleiben — und hältst fest mit stiller Kraft.',
  },
  {
    en: 'A mind like a bird. You will ask why about everything, collect words like pebbles, and change the subject before anyone has finished answering.',
    pt: 'Uma mente de passarinho. Você vai perguntar por quê sobre tudo, colecionar palavras como pedrinhas, e mudar de assunto antes de alguém terminar a resposta.',
    de: 'Ein Kopf wie ein Vogel. Du fragst bei allem warum, sammelst Wörter wie Kieselsteine, und wechselst das Thema, bevor jemand zu Ende geantwortet hat.',
  },
  {
    en: 'A soft shell over a soft heart. You feel a room before you understand it, and you love the people you love with your whole small body.',
    pt: 'Uma casca macia sobre um coração macio. Você sente o ambiente antes de entendê-lo, e ama quem ama com todo o seu corpinho.',
    de: 'Eine weiche Schale über einem weichen Herzen. Du spürst einen Raum, bevor du ihn verstehst, und liebst die Menschen, die du liebst, mit deinem ganzen kleinen Körper.',
  },
  {
    en: 'Born to be delighted in. You shine when you are seen, you give warmth away by the armful, and you turn an ordinary afternoon into an occasion.',
    pt: 'Nasceu para ser celebrado. Você brilha quando é visto, dá calor aos montes, e transforma uma tarde comum em um acontecimento.',
    de: 'Geboren, um bewundert zu werden. Du strahlst, wenn man dich sieht, verschenkst Wärme im Überfluss, und machst aus einem gewöhnlichen Nachmittag ein Ereignis.',
  },
  {
    en: 'A careful noticer. You see the crumb on the floor and the sadness on a face, and your first instinct is to make it better.',
    pt: 'Um observador cuidadoso. Você vê a migalha no chão e a tristeza num rosto, e seu primeiro instinto é melhorar as coisas.',
    de: 'Ein aufmerksamer Beobachter. Du siehst den Krümel auf dem Boden und die Traurigkeit in einem Gesicht, und dein erster Instinkt ist, es besser zu machen.',
  },
  {
    en: 'Made for company. You measure the world in fairness and beauty, and you are happiest when everyone at the table is all right.',
    pt: 'Feito para a companhia. Você mede o mundo em justiça e beleza, e é mais feliz quando todos à mesa estão bem.',
    de: 'Gemacht für Gesellschaft. Du misst die Welt in Fairness und Schönheit, und bist am glücklichsten, wenn es allen am Tisch gut geht.',
  },
  {
    en: 'All depth, no shallows. You give your trust slowly and completely, you notice what nobody says out loud, and you never love halfway.',
    pt: 'Só profundidade, sem raso. Você dá confiança devagar e por inteiro, percebe o que ninguém diz em voz alta, e nunca ama pela metade.',
    de: 'Nur Tiefe, keine Untiefen. Du schenkst dein Vertrauen langsam und ganz, bemerkst, was niemand laut sagt, und liebst nie nur halb.',
  },
  {
    en: 'An open road of a person. You want to see what is past the next hill, you believe the best of people, and you laugh from the belly.',
    pt: 'Uma pessoa feita de estrada aberta. Você quer ver o que há depois da próxima colina, acredita no melhor das pessoas, e ri com a barriga.',
    de: 'Ein Mensch wie eine offene Straße. Du willst sehen, was hinter dem nächsten Hügel liegt, glaubst das Beste von Menschen, und lachst aus vollem Bauch.',
  },
  {
    en: 'Old and sensible from the start. You build slowly, you keep your promises, and you will surprise everyone with a very dry sense of humour.',
    pt: 'Sensato e antigo desde o começo. Você constrói devagar, cumpre o que promete, e vai surpreender todo mundo com um humor bem seco.',
    de: 'Von Anfang an alt und vernünftig. Du baust langsam auf, hältst deine Versprechen, und wirst alle mit einem sehr trockenen Humor überraschen.',
  },
  {
    en: 'Your own particular person. You see the rule and immediately see around it, and you will collect the most interesting friends.',
    pt: 'Uma pessoa muito própria. Você vê a regra e já enxerga um jeito de contorná-la, e vai colecionar os amigos mais interessantes.',
    de: 'Ein ganz eigener Mensch. Du siehst die Regel und siehst sofort einen Weg drumherum, und wirst die interessantesten Freunde sammeln.',
  },
  {
    en: 'Made of weather and daydream. You absorb whatever is in the air, you imagine whole worlds before breakfast, and you are kind almost by reflex.',
    pt: 'Feito de clima e devaneio. Você absorve tudo o que está no ar, inventa mundos inteiros antes do café, e é gentil quase por reflexo.',
    de: 'Gemacht aus Wetter und Tagtraum. Du saugst auf, was in der Luft liegt, erfindest ganze Welten vor dem Frühstück, und bist freundlich fast wie ein Reflex.',
  },
];

/** The Moon: what soothes, what is needed, the private weather. */
export const MOON_IN_SIGN: BySign = [
  {
    en: 'You settle fastest when you are allowed to want things loudly. Big feelings arrive like weather and pass just as quickly.',
    pt: 'Você se acalma mais rápido quando pode querer as coisas em voz alta. Sentimentos grandes chegam como tempestade e passam igual de rápido.',
    de: 'Du beruhigst dich am schnellsten, wenn du laut wollen darfst. Große Gefühle kommen wie Wetter und ziehen genauso schnell weiter.',
  },
  {
    en: 'You are soothed by the body: warmth, food, rocking, the same song again. Change things slowly and you will go anywhere.',
    pt: 'Você se acalma pelo corpo: calor, comida, colo que balança, a mesma música de novo. Mudem as coisas devagar e você vai para qualquer lugar.',
    de: 'Du wirst durch den Körper beruhigt: Wärme, Essen, Wiegen, immer wieder dasselbe Lied. Verändere Dinge langsam, und du gehst überallhin mit.',
  },
  {
    en: 'You calm down when something is explained. Being talked to — even in nonsense — drops your shoulders.',
    pt: 'Você se acalma quando algo é explicado. Conversarem com você — mesmo sem sentido — faz os seus ombros relaxarem.',
    de: 'Du beruhigst dich, wenn dir etwas erklärt wird. Mit dir zu reden — auch Unsinn — lässt deine Schultern sinken.',
  },
  {
    en: 'Home is the whole answer. You need to be held, to be near your people, and to know that the door will open again.',
    pt: 'Casa é a resposta inteira. Você precisa de colo, de estar perto dos seus, e de saber que a porta vai se abrir de novo.',
    de: 'Zuhause ist die ganze Antwort. Du musst gehalten werden, in der Nähe deiner Menschen sein, und wissen, dass sich die Tür wieder öffnet.',
  },
  {
    en: 'You need to be adored out loud. Praise is not spoiling you — it is what you run on.',
    pt: 'Você precisa ser adorado em voz alta. Elogio não é mimo — é o seu combustível.',
    de: 'Du musst laut bewundert werden. Lob verwöhnt dich nicht — es ist dein Antrieb.',
  },
  {
    en: 'Routine is your lullaby. The same order of things, done the same way, tells your body that all is well.',
    pt: 'A rotina é a sua canção de ninar. A mesma ordem das coisas, do mesmo jeito, diz ao seu corpo que está tudo bem.',
    de: 'Routine ist dein Schlaflied. Die gleiche Ordnung der Dinge, auf die gleiche Art, sagt deinem Körper, dass alles gut ist.',
  },
  {
    en: 'You calm when things are calm between people. Peace in a room goes straight into you.',
    pt: 'Você se acalma quando as coisas estão calmas entre as pessoas. A paz do ambiente entra direto em você.',
    de: 'Du beruhigst dich, wenn es zwischen Menschen ruhig ist. Frieden im Raum geht direkt in dich hinein.',
  },
  {
    en: 'You feel everything at full volume, and hide most of it. Keep your small privacies, and one day you will trust someone with the big ones.',
    pt: 'Você sente tudo no volume máximo, e esconde quase tudo. Guarde os seus segredinhos, e um dia vai confiar os grandes a alguém.',
    de: 'Du fühlst alles in voller Lautstärke, und versteckst das meiste davon. Bewahre dir deine kleinen Geheimnisse, eines Tages vertraust du jemandem die großen an.',
  },
  {
    en: 'You need room and horizon. A change of scene does more for your mood than any amount of consoling.',
    pt: 'Você precisa de espaço e horizonte. Uma mudança de cenário faz mais pelo seu humor do que qualquer consolo.',
    de: 'Du brauchst Raum und Horizont. Ein Tapetenwechsel tut deiner Stimmung mehr gut als jeder Trost.',
  },
  {
    en: 'You are steadied by structure and by being taken seriously. You would rather be useful than fussed over.',
    pt: 'Você se firma com estrutura e ao ser levado a sério. Prefere ser útil a ser paparicado.',
    de: 'Struktur gibt dir Halt, und ernst genommen zu werden. Du bist lieber nützlich, als umsorgt zu werden.',
  },
  {
    en: 'You need a little distance to feel close. Given space, you come back on your own, every time.',
    pt: 'Você precisa de um pouco de distância para se sentir perto. Com espaço, você volta sozinho, sempre.',
    de: 'Du brauchst ein wenig Abstand, um Nähe zu spüren. Mit Raum kommst du von selbst zurück, jedes Mal.',
  },
  {
    en: 'You are a sponge for the mood of a room. Quiet, water, music and dim light will put you back together.',
    pt: 'Você é uma esponja para o clima do ambiente. Silêncio, água, música e luz baixa vão recompor você.',
    de: 'Du bist ein Schwamm für die Stimmung eines Raumes. Stille, Wasser, Musik und gedämpftes Licht setzen dich wieder zusammen.',
  },
];

/** The Ascendant: the doorway — first impression, and the body's own style. */
export const RISING_IN_SIGN: BySign = [
  {
    en: 'You arrive before you are announced. Direct, bright-eyed, already halfway across the room.',
    pt: 'Você chega antes de ser anunciado. Direto, de olhos vivos, já no meio da sala.',
    de: 'Du kommst an, bevor du angekündigt wirst. Direkt, mit wachen Augen, schon auf halbem Weg durch den Raum.',
  },
  {
    en: 'A calm, solid presence. People find you restful, and you take your own sweet time about everything.',
    pt: 'Uma presença calma e sólida. As pessoas descansam perto de você, e você faz tudo no seu próprio tempo.',
    de: 'Eine ruhige, solide Präsenz. Menschen finden dich entspannend, und du lässt dir für alles genüsslich Zeit.',
  },
  {
    en: 'Quick, chatty, and everywhere at once. You make friends in the queue at the bakery.',
    pt: 'Rápido, tagarela, e em todo lugar ao mesmo tempo. Você faz amizade na fila da padaria.',
    de: 'Schnell, geschwätzig, und überall gleichzeitig. Du schließt Freundschaften in der Schlange beim Bäcker.',
  },
  {
    en: 'Gentle at first meeting, and quietly watchful. You decide how you feel about someone before you show them.',
    pt: 'Gentil no primeiro encontro, e discretamente atento. Você decide o que sente por alguém antes de mostrar.',
    de: 'Sanft beim ersten Treffen, und still aufmerksam. Du entscheidest, was du für jemanden empfindest, bevor du es zeigst.',
  },
  {
    en: 'A small sun walking into a room. Warm, funny, and completely unembarrassed by attention.',
    pt: 'Um solzinho entrando na sala. Caloroso, engraçado, e nada envergonhado com a atenção.',
    de: 'Eine kleine Sonne, die einen Raum betritt. Warmherzig, witzig, und von Aufmerksamkeit völlig unverlegen.',
  },
  {
    en: 'Neat, observant, a little shy. You take in the details of a place before you commit to it.',
    pt: 'Cuidadoso, observador, um pouco tímido. Você absorve os detalhes do lugar antes de se entregar.',
    de: 'Ordentlich, aufmerksam, ein wenig schüchtern. Du nimmst die Details eines Ortes auf, bevor du dich darauf einlässt.',
  },
  {
    en: 'Charming from the doorway. You tilt toward whoever you are with, and people simply like you.',
    pt: 'Encantador já na porta. Você se inclina em direção a quem está com você, e as pessoas simplesmente gostam de você.',
    de: 'Charmant schon an der Tür. Du neigst dich dem zu, mit dem du zusammen bist, und Menschen mögen dich einfach.',
  },
  {
    en: 'A steady, unblinking gaze. You give away little, and you notice a great deal.',
    pt: 'Um olhar firme, que não pisca. Você entrega pouco, e percebe muitíssimo.',
    de: 'Ein ruhiger, unbewegter Blick. Du gibst wenig preis, und bemerkst sehr viel.',
  },
  {
    en: 'Open-faced and game for anything. You treat strangers as friends you have not been introduced to.',
    pt: 'De rosto aberto e topa tudo. Você trata desconhecidos como amigos a quem ainda não foi apresentado.',
    de: 'Offenen Gesichts und für alles zu haben. Du behandelst Fremde wie Freunde, denen du nur noch nicht vorgestellt wurdest.',
  },
  {
    en: 'Composed, a little formal, older than your age. You are trusted early and often.',
    pt: 'Contido, um pouco formal, mais velho que a sua idade. Confiam em você cedo e sempre.',
    de: 'Gefasst, etwas förmlich, älter als dein Alter. Man vertraut dir früh und oft.',
  },
  {
    en: 'Friendly and slightly otherworldly. There is something in you that is yours alone.',
    pt: 'Simpático e um pouco de outro mundo. Há em você algo que é só seu.',
    de: 'Freundlich und ein wenig weltfremd. Da ist etwas in dir, das ganz allein dir gehört.',
  },
  {
    en: 'Soft edges and dreaming eyes. You blend into the mood of wherever you are.',
    pt: 'Contornos suaves e olhos sonhadores. Você se mistura ao clima de onde estiver.',
    de: 'Weiche Konturen und träumende Augen. Du verschmilzt mit der Stimmung, wo immer du bist.',
  },
];

/**
 * What each moving point governs. Deliberately pronoun-free: these strings are
 * shown both in lists about Anton and inside a letter written to him.
 */
export const BODY_MEANING: Record<BodyKey, Bilingual> = {
  sun: { en: 'the self at the centre', pt: 'o eu no centro', de: 'das Selbst im Zentrum' },
  moon: {
    en: 'feeling, and what is needed',
    pt: 'o sentir, e o que é preciso',
    de: 'das Fühlen, und was gebraucht wird',
  },
  mercury: { en: 'thinking and speaking', pt: 'pensar e falar', de: 'Denken und Sprechen' },
  venus: {
    en: 'loving, and finding things beautiful',
    pt: 'amar, e achar as coisas bonitas',
    de: 'Lieben, und Dinge schön finden',
  },
  mars: { en: 'wanting, and fighting for it', pt: 'querer, e lutar por isso', de: 'Wollen, und dafür kämpfen' },
  jupiter: { en: 'luck and generosity', pt: 'sorte e generosidade', de: 'Glück und Großzügigkeit' },
  saturn: {
    en: 'what gets built slowly',
    pt: 'o que se constrói devagar',
    de: 'was langsam aufgebaut wird',
  },
  uranus: {
    en: 'what belongs to no one else',
    pt: 'o que não pertence a mais ninguém',
    de: 'was sonst niemandem gehört',
  },
  neptune: { en: 'dreaming, and dissolving', pt: 'sonhar, e se dissolver', de: 'Träumen, und sich auflösen' },
  pluto: { en: 'transformation', pt: 'transformação', de: 'Verwandlung' },
  northNode: {
    en: 'the direction of growth',
    pt: 'a direção do crescimento',
    de: 'die Richtung des Wachstums',
  },
  southNode: { en: 'what already comes easily', pt: 'o que já vem fácil', de: 'was schon leichtfällt' },
  lilith: { en: 'what will not be tamed', pt: 'o que não se doma', de: 'was sich nicht zähmen lässt' },
  fortune: {
    en: 'where things simply flow',
    pt: 'onde as coisas simplesmente fluem',
    de: 'wo die Dinge einfach fließen',
  },
};

export const HOUSE_MEANING: Bilingual[] = [
  {
    en: 'Body, face, the first move',
    pt: 'Corpo, rosto, o primeiro gesto',
    de: 'Körper, Gesicht, der erste Schritt',
  },
  {
    en: 'What is owned, and what is valued',
    pt: 'O que se tem, e o que se valoriza',
    de: 'Was man besitzt, und was einem wichtig ist',
  },
  {
    en: 'Siblings, streets, the way of learning',
    pt: 'Irmãos, ruas, o jeito de aprender',
    de: 'Geschwister, Straßen, die Art zu lernen',
  },
  {
    en: 'Home, roots, the family one comes from',
    pt: 'Casa, raízes, a família de onde se vem',
    de: 'Zuhause, Wurzeln, die Familie, aus der man kommt',
  },
  {
    en: 'Play, romance, everything made',
    pt: 'Brincadeira, romance, tudo o que se cria',
    de: 'Spiel, Romantik, alles Geschaffene',
  },
  {
    en: 'Daily rhythm, health, small kindnesses',
    pt: 'Ritmo do dia, saúde, gentilezas pequenas',
    de: 'Der Rhythmus des Alltags, Gesundheit, kleine Freundlichkeiten',
  },
  {
    en: 'The other person — partners and close friends',
    pt: 'O outro — parceiros e amigos próximos',
    de: 'Der andere Mensch — Partner und enge Freunde',
  },
  {
    en: 'What is shared, and what is hidden',
    pt: 'O que se divide, e o que se esconde',
    de: 'Was geteilt wird, und was verborgen bleibt',
  },
  {
    en: 'Far places, belief, the long view',
    pt: 'Lugares distantes, crença, a visão longa',
    de: 'Ferne Orte, Glaube, der weite Blick',
  },
  {
    en: 'The calling, and what the world sees',
    pt: 'A vocação, e o que o mundo vê',
    de: 'Die Berufung, und was die Welt sieht',
  },
  {
    en: 'Friends, groups, the future wanted',
    pt: 'Amigos, grupos, o futuro desejado',
    de: 'Freunde, Gruppen, die erhoffte Zukunft',
  },
  {
    en: 'Rest, dreams, the quiet behind everything',
    pt: 'Descanso, sonhos, o silêncio atrás de tudo',
    de: 'Ruhe, Träume, die Stille hinter allem',
  },
];

export const ASPECT_MEANING: Record<AspectKey, Bilingual> = {
  conjunction: {
    en: 'standing together — these two act as one',
    pt: 'juntos — os dois agem como um só',
    de: 'zusammenstehend — die beiden handeln wie eins',
  },
  sextile: {
    en: 'an easy opening, for whoever reaches for it',
    pt: 'uma abertura fácil, para quem for buscar',
    de: 'eine leichte Öffnung, für wer danach greift',
  },
  square: {
    en: 'friction that builds muscle',
    pt: 'atrito que constrói músculo',
    de: 'Reibung, die Kraft aufbaut',
  },
  trine: {
    en: 'a gift that arrives without asking',
    pt: 'um dom que chega sem pedir',
    de: 'ein Geschenk, das ankommt, ohne zu fragen',
  },
  opposition: {
    en: 'two truths pulling, learning balance',
    pt: 'duas verdades puxando, aprendendo equilíbrio',
    de: 'zwei Wahrheiten, die ziehen, und Gleichgewicht lernen',
  },
  quincunx: {
    en: 'an odd angle that asks for adjustment',
    pt: 'um ângulo estranho que pede ajuste',
    de: 'ein seltsamer Winkel, der Anpassung verlangt',
  },
};

export const ELEMENT_MEANING: Record<Element, Bilingual> = {
  fire: { en: 'warmth, courage, momentum', pt: 'calor, coragem, impulso', de: 'Wärme, Mut, Schwung' },
  earth: {
    en: 'patience, senses, solid ground',
    pt: 'paciência, sentidos, chão firme',
    de: 'Geduld, Sinne, fester Boden',
  },
  air: { en: 'thought, words, connection', pt: 'pensamento, palavras, conexão', de: 'Gedanke, Worte, Verbindung' },
  water: { en: 'feeling, memory, depth', pt: 'sentimento, memória, profundidade', de: 'Gefühl, Erinnerung, Tiefe' },
};

export const MODALITY_MEANING: Record<Modality, Bilingual> = {
  cardinal: { en: 'begins things', pt: 'começa as coisas', de: 'beginnt die Dinge' },
  fixed: { en: 'holds things', pt: 'sustenta as coisas', de: 'hält die Dinge' },
  mutable: { en: 'changes things', pt: 'transforma as coisas', de: 'verändert die Dinge' },
};
