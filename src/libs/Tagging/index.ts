import Graph from "graphology";
import dijkstra from "graphology-shortest-path/dijkstra";

export const Events = {
  vacation: "vacation",
  culture: "culture",
  adventure: "adventure",
  festival: "festival",
  health: "health",
  romance: "romance",
  education: "education",
  family: "family",
} as const;

export const Interests = {
  food: "food",
  books: "books",
  gaming: "gaming",
  anime: "anime",
  sports: "sports",
  music: "music",
  literature: "literature",
  technology: "technology",
  cooking: "cooking",
  travel: "travel",
  art: "art",
  nature: "nature",
  movies: "movies",
  photography: "photography",
  fashion: "fashion",
  history: "history",
  science: "science",
  fitness: "fitness",
  gardening: "gardening",
  pets: "pets",
  spirituality: "spirituality",
  DIY: "DIY",
  crafts: "crafts",
  cars: "cars",
  hiking: "hiking",
} as const;

const Connections = [
  ["vacation", "travel", 9],
  ["festival", "music", 9],
  ["health", "fitness", 7],
  ["romance", "literature", 5],
  ["family", "pets", 6],
  ["festival", "food", 3],
  ["adventure", "nature", 7],
  ["festival", "art", 6],
  ["education", "technology", 8],
  ["festival", "movies", 6],
  ["festival", "photography", 4],
  ["romance", "gardening", 4],
  ["health", "spirituality", 3],
  ["education", "science", 10],
  ["romance", "fashion", 5],
  ["family", "DIY", 4],
  ["vacation", "cooking", 3],
  ["vacation", "history", 5],
  ["romance", "music", 8],
  ["food", "cooking", 8],
  ["gaming", "technology", 6],
  ["anime", "art", 9],
  ["sports", "fitness", 8],
  ["literature", "books", 9],
  ["technology", "DIY", 4],
  ["travel", "nature", 7],
  ["art", "photography", 6],
  ["nature", "gardening", 7],
  ["fashion", "art", 6],
  ["history", "literature", 8],
  ["science", "technology", 10],
  ["anime", "movies", 6],
  ["music", "art", 8],
  ["cooking", "travel", 8],
  ["movies", "music", 7],
  ["history", "science", 6],
  ["DIY", "crafts", 6],
  ["crafts", "art", 5],
  ["technology", "cars", 6],
  ["hiking", "nature", 8],
  ["music", "travel", 7],
  ["cooking", "gardening", 8],
  ["hiking", "cooking", 3],
  ["hiking", "vacation", 5],
];

export const newGraph = () => {
  const graph = new Graph({ type: "undirected" });

  Object.keys(Events).forEach((node) => {
    graph.addNode(node, {
      x: Math.random() * 300,
      y: Math.random() * 300,
    });
  });

  Object.keys(Interests).forEach((node) => {
    graph.addNode(node, {
      x: Math.random() * 300,
      y: Math.random() * 300,
    });
  });

  Connections.forEach(([first, second]) => {
    try {
      graph.addEdge(first, second);
    } catch (error) {
      console.log(first, second);
    }
  });
  return graph;
};

export const getTagDifference = (
  graph: Graph,
  source: string,
  target: string,
) => {
  try {
    const path = dijkstra.bidirectional(graph, source, target);
    return path.length - 1;
  } catch (error) {
    console.log("Graph node not found!");
    return 0;
  }
};
