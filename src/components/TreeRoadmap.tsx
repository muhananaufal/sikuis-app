'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NodeInteractionDialog } from './NodeInteractionDialog';

export interface RoadmapItem {
	id: string;
	title: string;
	description: string;
	children: RoadmapItem[];
	x?: number;
	y?: number;
	level?: number;
}

interface TreeRoadmapProps {
	RoadmapData?: RoadmapItem[];
}

// Default mock data when no props are provided
const defaultMockData: RoadmapItem[] = [];

const TreeNode = ({ node, onClick, isChild = false, isMobile = false }: { node: RoadmapItem & { x: number; y: number }; onClick: (node: RoadmapItem) => void; isChild?: boolean; isMobile?: boolean }) => {
	return (
		<div className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-105 ${isChild ? 'z-20' : 'z-10'}`} style={{ left: node.x, top: node.y }} onClick={() => onClick(node)}>
			<Card
				className={`${
					isChild
						? isMobile
							? 'w-32 bg-blue-50 border-blue-200 hover:bg-blue-100'
							: 'w-40 bg-blue-50 border-blue-200 hover:bg-blue-100'
						: isMobile
						? 'w-36 bg-white border-slate-300 hover:shadow-lg'
						: 'w-48 bg-white border-slate-300 hover:shadow-lg'
				} transition-all duration-300`}
			>
				<CardContent className={`${isMobile ? 'p-3' : 'p-4'} text-center`}>
					<h3 className={`font-semibold leading-tight ${isChild ? (isMobile ? 'text-xs text-blue-800' : 'text-sm text-blue-800') : isMobile ? 'text-sm text-slate-800' : 'text-base text-slate-800'}`}>{node.title}</h3>
					{node.children.length > 0 && !isChild && (
						<div className={`${isMobile ? 'text-xs' : 'text-xs'} text-slate-500 mt-1`}>
							{node.children.length} subtopic
							{node.children.length !== 1 ? 's' : ''}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

const ConnectionLine = ({
	from,
	to,
	isChildConnection = false,
	containerWidth,
	containerHeight,
}: {
	from: { x: number; y: number };
	to: { x: number; y: number };
	isChildConnection?: boolean;
	containerWidth: number;
	containerHeight: number;
}) => {
	if (isChildConnection) {
		// For child connections, create an L-shaped path
		const midX = from.x + (to.x - from.x) * 0.6;

		return (
			<svg className="absolute top-0 left-0 pointer-events-none" width={containerWidth} height={containerHeight} style={{ zIndex: 1 }}>
				<path d={`M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`} stroke="#2563eb" strokeWidth="2" fill="none" strokeDasharray="6,3" opacity="1" />
				{/* Arrow for child connection */}
				<polygon points={`${to.x - 6},${to.y - 3} ${to.x},${to.y} ${to.x - 6},${to.y + 3}`} fill="#2563eb" />
			</svg>
		);
	} else {
		// For main path connections, create a straight vertical line
		return (
			<svg className="absolute top-0 left-0 pointer-events-none" width={containerWidth} height={containerHeight} style={{ zIndex: 1 }}>
				<path d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`} stroke="#374151" strokeWidth="3" fill="none" opacity="1" />
				{/* Arrow for main connection */}
				<polygon points={`${to.x - 5},${to.y - 6} ${to.x + 5},${to.y - 6} ${to.x},${to.y}`} fill="#374151" />
			</svg>
		);
	}
};

export default function TreeRoadmap({ RoadmapData }: TreeRoadmapProps) {
	const [selectedNode, setSelectedNode] = useState<RoadmapItem | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	// Use provided data or fallback to default mock data
	const dataToUse = RoadmapData && RoadmapData.length > 0 ? RoadmapData : [];

	// Detect mobile device
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1000);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Calculate positions for nodes
	const calculatePositions = (data: RoadmapItem[]) => {
		const positioned: (RoadmapItem & { x: number; y: number })[] = [];

		// Responsive dimensions
		const centerX = isMobile ? 200 : 600;
		const startY = isMobile ? 80 : 100;
		const minMainNodeSpacing = isMobile ? 140 : 180;
		const childSpacing = isMobile ? 80 : 100;
		const childOffset = isMobile ? 150 : 250;

		let currentY = startY;

		data.forEach((node, index) => {
			// Calculate space needed for this node's children
			const childrenCount = node.children.length;
			const childrenHeight = childrenCount > 0 ? Math.max(childrenCount * childSpacing, minMainNodeSpacing) : minMainNodeSpacing;

			// Position main node in the center of its allocated space
			const mainNodeY = currentY + childrenHeight / 2;

			// Position main node
			positioned.push({
				...node,
				x: centerX,
				y: mainNodeY,
			});

			// Position child nodes
			if (childrenCount > 0) {
				const startChildY = currentY + (isMobile ? 40 : 50);

				node.children.forEach((child, childIndex) => {
					const isLeft = childIndex % 2 === 0;
					const childX = centerX + (isLeft ? -childOffset : childOffset);
					const childY = startChildY + childIndex * childSpacing;

					positioned.push({
						...child,
						x: childX,
						y: childY,
					});
				});
			}

			// Move to next section, ensuring enough space for children
			currentY += Math.max(childrenHeight + (isMobile ? 60 : 80), minMainNodeSpacing + (isMobile ? 60 : 80));
		});

		return positioned;
	};

	const handleNodeClick = (node: RoadmapItem) => {
		setSelectedNode(node);
	};

	const positionedNodes = calculatePositions(dataToUse);
	const mainNodes = positionedNodes.filter((node) => dataToUse.some((mainNode) => mainNode.id === node.id));
	const childNodes = positionedNodes.filter((node) => !dataToUse.some((mainNode) => mainNode.id === node.id));

	// Responsive container dimensions
	const containerWidth = isMobile ? 400 : 1200;
	const containerHeight = Math.max(
		isMobile ? 800 : 1000,
		dataToUse.reduce((acc, node) => acc + Math.max(node.children.length * (isMobile ? 45 : 60) + (isMobile ? 140 : 180), isMobile ? 200 : 260), 200)
	);

	return (
		<div className="relative w-full">
			{/* Roadmap Container */}
			<div
				className={`relative mx-auto bg-gradient-to-b from-slate-100 to-slate-200 rounded-lg border border-slate-300 overflow-x-auto overflow-y-hidden ${isMobile ? 'px-2' : ''}`}
				style={{
					width: isMobile ? '100%' : `${containerWidth}px`,
					maxWidth: isMobile ? '100vw' : 'none',
					height: `${containerHeight}px`,
				}}
			>
				{/* Inner container for positioning */}
				<div
					id="downloadableElement"
					className="relative mx-auto"
					style={{
						width: `${containerWidth}px`,
						height: `${containerHeight}px`,
						minWidth: isMobile ? '400px' : 'auto',
					}}
				>
					{/* Main path connections */}
					{mainNodes.length > 1 &&
						mainNodes.slice(0, -1).map((node, index) => {
							const nextNode = mainNodes[index + 1];
							return (
								<ConnectionLine key={`main-${index}`} from={{ x: node.x, y: node.y + (isMobile ? 40 : 50) }} to={{ x: nextNode.x, y: nextNode.y - (isMobile ? 40 : 50) }} containerWidth={containerWidth} containerHeight={containerHeight} />
							);
						})}

					{/* Child connections */}
					{dataToUse.length > 0 &&
						dataToUse.map((mainNode) => {
							const mainNodePos = mainNodes.find((n) => n.id === mainNode.id);
							if (!mainNodePos) return null;

							return mainNode.children.map((child) => {
								const childNodePos = childNodes.find((n) => n.id === child.id);
								if (!childNodePos) return null;

								return (
									<ConnectionLine
										key={`child-${child.id}`}
										from={{
											x: mainNodePos.x + (childNodePos.x > mainNodePos.x ? (isMobile ? 40 : 50) : -(isMobile ? 40 : 50)),
											y: mainNodePos.y,
										}}
										to={{
											x: childNodePos.x + (childNodePos.x > mainNodePos.x ? -(isMobile ? 40 : 50) : isMobile ? 40 : 50),
											y: childNodePos.y,
										}}
										isChildConnection={true}
										containerWidth={containerWidth}
										containerHeight={containerHeight}
									/>
								);
							});
						})}

					{/* Main nodes */}
					{mainNodes.map((node) => (
						<TreeNode key={node.id} node={node} onClick={handleNodeClick} isMobile={isMobile} />
					))}

					{/* Child nodes */}
					{childNodes.map((node) => (
						<TreeNode key={node.id} node={node} onClick={handleNodeClick} isChild={true} isMobile={isMobile} />
					))}
				</div>
			</div>

			{/* Mobile scroll hint */}
			{isMobile && <div className="text-center mt-2 text-xs text-slate-500">← Scroll horizontally to explore →</div>}

			{/* Modal */}
			<Dialog open={!!selectedNode} onOpenChange={(isOpen) => !isOpen && setSelectedNode(null)}>
				{selectedNode && <NodeInteractionDialog node={selectedNode} isMobile={isMobile} />}
			</Dialog>
		</div>
	);
}
