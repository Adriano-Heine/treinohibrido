export interface ExerciseItem {
  id: string;
  number: string;
  englishName: string;
  pronunciation: string;
  portugueseTranslation: string;
  category: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const EXERCISES: ExerciseItem[] = [
  {
    id: 'skierg',
    number: '01',
    englishName: 'SKIERG',
    pronunciation: 'Ski Érg',
    portugueseTranslation: 'Simulador de esqui',
    category: 'Estação de treino híbrido',
    description:
      'Exercício realizado em um equipamento que simula o movimento do esqui, utilizando puxadas com os braços.',
    imageSrc: '/src/assets/images/exercise_skierg_1795533178052.jpg',
    imageAlt: 'Atleta utilizando o equipamento SkiErg puxando os cabos para baixo',
  },
  {
    id: 'sled-push',
    number: '02',
    englishName: 'SLED PUSH',
    pronunciation: 'Sled Pâsh',
    portugueseTranslation: 'Empurrar trenó',
    category: 'Estação de treino híbrido',
    description:
      'Exercício em que o atleta empurra um trenó com carga por uma determinada distância.',
    imageSrc: '/src/assets/images/exercise_sled_push_1795533178745.jpg',
    imageAlt: 'Atleta empurrando um trenó com anilhas sobre grama sintética',
  },
  {
    id: 'sled-pull',
    number: '03',
    englishName: 'SLED PULL',
    pronunciation: 'Sled Púl',
    portugueseTranslation: 'Puxar trenó',
    category: 'Estação de treino híbrido',
    description:
      'Exercício em que o atleta puxa um trenó com carga utilizando uma corda.',
    imageSrc: '/src/assets/images/exercise_sled_pull_1795533178613.jpg',
    imageAlt: 'Atleta puxando um trenó com carga utilizando uma corda grossa',
  },
  {
    id: 'burpee-broad-jump',
    number: '04',
    englishName: 'BURPEE BROAD JUMP',
    pronunciation: 'Bâr-pi Bród Djâmp',
    portugueseTranslation: 'Burpee com salto horizontal',
    category: 'Estação de treino híbrido',
    description:
      'Movimento que combina o burpee com um salto para a frente, avançando progressivamente.',
    imageSrc: '/src/assets/images/exercise_burpee_broad_jump_twofoot_1795533217565.jpg',
    imageAlt: 'Atleta realizando um salto horizontal para a frente com os dois pés juntos',
  },
  {
    id: 'rowing',
    number: '05',
    englishName: 'ROWING',
    pronunciation: 'Rôuin',
    portugueseTranslation: 'Remo',
    category: 'Estação de treino híbrido',
    description:
      'Exercício realizado em um equipamento de remo indoor, simulando a remada.',
    imageSrc: '/src/assets/images/exercise_rowing_1795533178129.jpg',
    imageAlt: 'Atleta sentado em um equipamento de remo indoor executando a puxada',
  },
  {
    id: 'farmers-carry',
    number: '06',
    englishName: 'FARMERS CARRY',
    pronunciation: 'Fármers Kéri',
    portugueseTranslation: 'Caminhada carregando pesos',
    category: 'Estação de treino híbrido',
    description:
      'Exercício em que o atleta caminha carregando pesos nas duas mãos.',
    imageSrc: '/src/assets/images/exercise_farmers_carry_1795533179305.jpg',
    imageAlt: 'Atleta caminhando carregando dois kettlebells nas mãos ao lado do corpo',
  },
  {
    id: 'sandbag-lunges',
    number: '07',
    englishName: 'SANDBAG LUNGES',
    pronunciation: 'Sénd-bég Lân-djis',
    portugueseTranslation: 'Avanços com saco de areia',
    category: 'Estação de treino híbrido',
    description:
      'Exercício que consiste em avançar com passadas enquanto carrega um saco de areia.',
    imageSrc: '/src/assets/images/exercise_sandbag_lunges_1795533178984.jpg',
    imageAlt: 'Atleta realizando passadas de avanço com um saco de areia sobre os ombros',
  },
  {
    id: 'wall-balls',
    number: '08',
    englishName: 'WALL BALLS',
    pronunciation: 'Uól Bóls',
    portugueseTranslation: 'Arremessos de bola na parede',
    category: 'Estação de treino híbrido',
    description:
      'Exercício que combina agachamento e arremesso de uma bola em direção a um alvo na parede.',
    imageSrc: '/src/assets/images/exercise_wall_balls_1795533179414.jpg',
    imageAlt: 'Atleta arremessando uma medicine ball em direção ao alvo circular na parede',
  },
];
