/**
 * Interpretation copy, in English and Brazilian Portuguese.
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
  },
  {
    en: 'Rooted and unhurried. You gather comfort around you — familiar smells, a favourite blanket, people who stay — and you hold on with quiet strength.',
    pt: 'Enraizado e sem pressa. Você junta conforto ao seu redor — cheiros conhecidos, o cobertor preferido, gente que fica — e segura firme com uma força silenciosa.',
  },
  {
    en: 'A mind like a bird. You will ask why about everything, collect words like pebbles, and change the subject before anyone has finished answering.',
    pt: 'Uma mente de passarinho. Você vai perguntar por quê sobre tudo, colecionar palavras como pedrinhas, e mudar de assunto antes de alguém terminar a resposta.',
  },
  {
    en: 'A soft shell over a soft heart. You feel a room before you understand it, and you love the people you love with your whole small body.',
    pt: 'Uma casca macia sobre um coração macio. Você sente o ambiente antes de entendê-lo, e ama quem ama com todo o seu corpinho.',
  },
  {
    en: 'Born to be delighted in. You shine when you are seen, you give warmth away by the armful, and you turn an ordinary afternoon into an occasion.',
    pt: 'Nasceu para ser celebrado. Você brilha quando é visto, dá calor aos montes, e transforma uma tarde comum em um acontecimento.',
  },
  {
    en: 'A careful noticer. You see the crumb on the floor and the sadness on a face, and your first instinct is to make it better.',
    pt: 'Um observador cuidadoso. Você vê a migalha no chão e a tristeza num rosto, e seu primeiro instinto é melhorar as coisas.',
  },
  {
    en: 'Made for company. You measure the world in fairness and beauty, and you are happiest when everyone at the table is all right.',
    pt: 'Feito para a companhia. Você mede o mundo em justiça e beleza, e é mais feliz quando todos à mesa estão bem.',
  },
  {
    en: 'All depth, no shallows. You give your trust slowly and completely, you notice what nobody says out loud, and you never love halfway.',
    pt: 'Só profundidade, sem raso. Você dá confiança devagar e por inteiro, percebe o que ninguém diz em voz alta, e nunca ama pela metade.',
  },
  {
    en: 'An open road of a person. You want to see what is past the next hill, you believe the best of people, and you laugh from the belly.',
    pt: 'Uma pessoa feita de estrada aberta. Você quer ver o que há depois da próxima colina, acredita no melhor das pessoas, e ri com a barriga.',
  },
  {
    en: 'Old and sensible from the start. You build slowly, you keep your promises, and you will surprise everyone with a very dry sense of humour.',
    pt: 'Sensato e antigo desde o começo. Você constrói devagar, cumpre o que promete, e vai surpreender todo mundo com um humor bem seco.',
  },
  {
    en: 'Your own particular person. You see the rule and immediately see around it, and you will collect the most interesting friends.',
    pt: 'Uma pessoa muito própria. Você vê a regra e já enxerga um jeito de contorná-la, e vai colecionar os amigos mais interessantes.',
  },
  {
    en: 'Made of weather and daydream. You absorb whatever is in the air, you imagine whole worlds before breakfast, and you are kind almost by reflex.',
    pt: 'Feito de clima e devaneio. Você absorve tudo o que está no ar, inventa mundos inteiros antes do café, e é gentil quase por reflexo.',
  },
];

/** The Moon: what soothes, what is needed, the private weather. */
export const MOON_IN_SIGN: BySign = [
  {
    en: 'You settle fastest when you are allowed to want things loudly. Big feelings arrive like weather and pass just as quickly.',
    pt: 'Você se acalma mais rápido quando pode querer as coisas em voz alta. Sentimentos grandes chegam como tempestade e passam igual de rápido.',
  },
  {
    en: 'You are soothed by the body: warmth, food, rocking, the same song again. Change things slowly and you will go anywhere.',
    pt: 'Você se acalma pelo corpo: calor, comida, colo que balança, a mesma música de novo. Mudem as coisas devagar e você vai para qualquer lugar.',
  },
  {
    en: 'You calm down when something is explained. Being talked to — even in nonsense — drops your shoulders.',
    pt: 'Você se acalma quando algo é explicado. Conversarem com você — mesmo sem sentido — faz os seus ombros relaxarem.',
  },
  {
    en: 'Home is the whole answer. You need to be held, to be near your people, and to know that the door will open again.',
    pt: 'Casa é a resposta inteira. Você precisa de colo, de estar perto dos seus, e de saber que a porta vai se abrir de novo.',
  },
  {
    en: 'You need to be adored out loud. Praise is not spoiling you — it is what you run on.',
    pt: 'Você precisa ser adorado em voz alta. Elogio não é mimo — é o seu combustível.',
  },
  {
    en: 'Routine is your lullaby. The same order of things, done the same way, tells your body that all is well.',
    pt: 'A rotina é a sua canção de ninar. A mesma ordem das coisas, do mesmo jeito, diz ao seu corpo que está tudo bem.',
  },
  {
    en: 'You calm when things are calm between people. Peace in a room goes straight into you.',
    pt: 'Você se acalma quando as coisas estão calmas entre as pessoas. A paz do ambiente entra direto em você.',
  },
  {
    en: 'You feel everything at full volume, and hide most of it. Keep your small privacies, and one day you will trust someone with the big ones.',
    pt: 'Você sente tudo no volume máximo, e esconde quase tudo. Guarde os seus segredinhos, e um dia vai confiar os grandes a alguém.',
  },
  {
    en: 'You need room and horizon. A change of scene does more for your mood than any amount of consoling.',
    pt: 'Você precisa de espaço e horizonte. Uma mudança de cenário faz mais pelo seu humor do que qualquer consolo.',
  },
  {
    en: 'You are steadied by structure and by being taken seriously. You would rather be useful than fussed over.',
    pt: 'Você se firma com estrutura e ao ser levado a sério. Prefere ser útil a ser paparicado.',
  },
  {
    en: 'You need a little distance to feel close. Given space, you come back on your own, every time.',
    pt: 'Você precisa de um pouco de distância para se sentir perto. Com espaço, você volta sozinho, sempre.',
  },
  {
    en: 'You are a sponge for the mood of a room. Quiet, water, music and dim light will put you back together.',
    pt: 'Você é uma esponja para o clima do ambiente. Silêncio, água, música e luz baixa vão recompor você.',
  },
];

/** The Ascendant: the doorway — first impression, and the body's own style. */
export const RISING_IN_SIGN: BySign = [
  {
    en: 'You arrive before you are announced. Direct, bright-eyed, already halfway across the room.',
    pt: 'Você chega antes de ser anunciado. Direto, de olhos vivos, já no meio da sala.',
  },
  {
    en: 'A calm, solid presence. People find you restful, and you take your own sweet time about everything.',
    pt: 'Uma presença calma e sólida. As pessoas descansam perto de você, e você faz tudo no seu próprio tempo.',
  },
  {
    en: 'Quick, chatty, and everywhere at once. You make friends in the queue at the bakery.',
    pt: 'Rápido, tagarela, e em todo lugar ao mesmo tempo. Você faz amizade na fila da padaria.',
  },
  {
    en: 'Gentle at first meeting, and quietly watchful. You decide how you feel about someone before you show them.',
    pt: 'Gentil no primeiro encontro, e discretamente atento. Você decide o que sente por alguém antes de mostrar.',
  },
  {
    en: 'A small sun walking into a room. Warm, funny, and completely unembarrassed by attention.',
    pt: 'Um solzinho entrando na sala. Caloroso, engraçado, e nada envergonhado com a atenção.',
  },
  {
    en: 'Neat, observant, a little shy. You take in the details of a place before you commit to it.',
    pt: 'Cuidadoso, observador, um pouco tímido. Você absorve os detalhes do lugar antes de se entregar.',
  },
  {
    en: 'Charming from the doorway. You tilt toward whoever you are with, and people simply like you.',
    pt: 'Encantador já na porta. Você se inclina em direção a quem está com você, e as pessoas simplesmente gostam de você.',
  },
  {
    en: 'A steady, unblinking gaze. You give away little, and you notice a great deal.',
    pt: 'Um olhar firme, que não pisca. Você entrega pouco, e percebe muitíssimo.',
  },
  {
    en: 'Open-faced and game for anything. You treat strangers as friends you have not been introduced to.',
    pt: 'De rosto aberto e topa tudo. Você trata desconhecidos como amigos a quem ainda não foi apresentado.',
  },
  {
    en: 'Composed, a little formal, older than your age. You are trusted early and often.',
    pt: 'Contido, um pouco formal, mais velho que a sua idade. Confiam em você cedo e sempre.',
  },
  {
    en: 'Friendly and slightly otherworldly. There is something in you that is yours alone.',
    pt: 'Simpático e um pouco de outro mundo. Há em você algo que é só seu.',
  },
  {
    en: 'Soft edges and dreaming eyes. You blend into the mood of wherever you are.',
    pt: 'Contornos suaves e olhos sonhadores. Você se mistura ao clima de onde estiver.',
  },
];

/**
 * What each moving point governs. Deliberately pronoun-free: these strings are
 * shown both in lists about Anton and inside a letter written to him.
 */
export const BODY_MEANING: Record<BodyKey, Bilingual> = {
  sun: { en: 'the self at the centre', pt: 'o eu no centro' },
  moon: { en: 'feeling, and what is needed', pt: 'o sentir, e o que é preciso' },
  mercury: { en: 'thinking and speaking', pt: 'pensar e falar' },
  venus: { en: 'loving, and finding things beautiful', pt: 'amar, e achar as coisas bonitas' },
  mars: { en: 'wanting, and fighting for it', pt: 'querer, e lutar por isso' },
  jupiter: { en: 'luck and generosity', pt: 'sorte e generosidade' },
  saturn: { en: 'what gets built slowly', pt: 'o que se constrói devagar' },
  uranus: { en: 'what belongs to no one else', pt: 'o que não pertence a mais ninguém' },
  neptune: { en: 'dreaming, and dissolving', pt: 'sonhar, e se dissolver' },
  pluto: { en: 'transformation', pt: 'transformação' },
  northNode: { en: 'the direction of growth', pt: 'a direção do crescimento' },
  southNode: { en: 'what already comes easily', pt: 'o que já vem fácil' },
  lilith: { en: 'what will not be tamed', pt: 'o que não se doma' },
  fortune: { en: 'where things simply flow', pt: 'onde as coisas simplesmente fluem' },
};

export const HOUSE_MEANING: Bilingual[] = [
  { en: 'Body, face, the first move', pt: 'Corpo, rosto, o primeiro gesto' },
  { en: 'What is owned, and what is valued', pt: 'O que se tem, e o que se valoriza' },
  { en: 'Siblings, streets, the way of learning', pt: 'Irmãos, ruas, o jeito de aprender' },
  { en: 'Home, roots, the family one comes from', pt: 'Casa, raízes, a família de onde se vem' },
  { en: 'Play, romance, everything made', pt: 'Brincadeira, romance, tudo o que se cria' },
  { en: 'Daily rhythm, health, small kindnesses', pt: 'Ritmo do dia, saúde, gentilezas pequenas' },
  { en: 'The other person — partners and close friends', pt: 'O outro — parceiros e amigos próximos' },
  { en: 'What is shared, and what is hidden', pt: 'O que se divide, e o que se esconde' },
  { en: 'Far places, belief, the long view', pt: 'Lugares distantes, crença, a visão longa' },
  { en: 'The calling, and what the world sees', pt: 'A vocação, e o que o mundo vê' },
  { en: 'Friends, groups, the future wanted', pt: 'Amigos, grupos, o futuro desejado' },
  { en: 'Rest, dreams, the quiet behind everything', pt: 'Descanso, sonhos, o silêncio atrás de tudo' },
];

export const ASPECT_MEANING: Record<AspectKey, Bilingual> = {
  conjunction: {
    en: 'standing together — these two act as one',
    pt: 'juntos — os dois agem como um só',
  },
  sextile: {
    en: 'an easy opening, for whoever reaches for it',
    pt: 'uma abertura fácil, para quem for buscar',
  },
  square: {
    en: 'friction that builds muscle',
    pt: 'atrito que constrói músculo',
  },
  trine: {
    en: 'a gift that arrives without asking',
    pt: 'um dom que chega sem pedir',
  },
  opposition: {
    en: 'two truths pulling, learning balance',
    pt: 'duas verdades puxando, aprendendo equilíbrio',
  },
  quincunx: {
    en: 'an odd angle that asks for adjustment',
    pt: 'um ângulo estranho que pede ajuste',
  },
};

export const ELEMENT_MEANING: Record<Element, Bilingual> = {
  fire: { en: 'warmth, courage, momentum', pt: 'calor, coragem, impulso' },
  earth: { en: 'patience, senses, solid ground', pt: 'paciência, sentidos, chão firme' },
  air: { en: 'thought, words, connection', pt: 'pensamento, palavras, conexão' },
  water: { en: 'feeling, memory, depth', pt: 'sentimento, memória, profundidade' },
};

export const MODALITY_MEANING: Record<Modality, Bilingual> = {
  cardinal: { en: 'begins things', pt: 'começa as coisas' },
  fixed: { en: 'holds things', pt: 'sustenta as coisas' },
  mutable: { en: 'changes things', pt: 'transforma as coisas' },
};
