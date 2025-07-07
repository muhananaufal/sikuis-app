export type Roadmap = {
  id: string;
  title: string;
  data: RoadmapNode[];
}

export type RoadmapNode = {
  id: string;
  title: string;
  description: string;
  children: RoadmapNode[];
}
