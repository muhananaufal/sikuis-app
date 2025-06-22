// components/RoadmapComponents.tsx

export type RoadmapNode = {
  title: string;
  children: RoadmapNode[];
};

export function Node({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="relative bg-black text-white px-4 py-2 rounded whitespace-nowrap"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function NodeContainer({
  node,
  onNodeClick,
}: {
  node: RoadmapNode;
  onNodeClick: (node: RoadmapNode) => void;
}) {
  return (
    <div className="node-container flex items-center gap-4">
      <Node label={node.title} onClick={() => onNodeClick(node)} />
      {node.children?.length > 0 && (
        <div className="children flex flex-col gap-2 pl-4 ml-4 border-l-2 border-gray-400">
          {node.children.map((child: RoadmapNode, index: number) => (
            <NodeContainer key={index} node={child} onNodeClick={onNodeClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Modal({
  node,
  onClose,
}: {
  node: RoadmapNode | null;
  onClose: () => void;
}) {
  if (!node) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">{node.title}</h2>
        <p className="mb-4">Future properties go here…</p>
        <button
          onClick={onClose}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
