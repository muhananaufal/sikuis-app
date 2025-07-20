'use client';

import MainLayout from '@/components/MainLayout';
import TreeRoadmap, { RoadmapItem } from '@/components/TreeRoadmap';
import { useActionState, useState, useEffect } from 'react'; // Tambahkan useState & useEffect
import { generateRoadmapAction, saveRoadmapAction, RoadmapState } from './action';

const initialState: RoadmapState = {};

export default function GenerateRoadmaps() {
	const [state, formAction, isPending] = useActionState(generateRoadmapAction, initialState);

	// ✅ STEP 1: Tambahkan state untuk mengontrol input topic
	const [topic, setTopic] = useState('');
	const [generatedRoadmap, setGeneratedRoadmap] = useState<RoadmapItem[] | null>(null);

	useEffect(() => {
		if (state?.data) {
			setGeneratedRoadmap(state.data);
		}
	}, [state]);

	return (
		<MainLayout>
			<div className="max-w-xl mx-auto mt-10 p-6">
				<h2 className="text-3xl font-semibold text-color-brand text-center">Generate Roadmaps with AI</h2>
				{/* ... */}
				<form action={formAction}>
					{/* ✅ STEP 2: Jadikan input ini "controlled component" */}
					<input
						type="text"
						name="topic"
						placeholder="Enter a topic to generate roadmap for"
						required
						className="w-full border-2 border-text-secondary px-4 py-4 text-text-primary focus:outline-none rounded-xl text-center"
						value={topic} // Tambahkan value
						onChange={(e) => setTopic(e.target.value)} // Tambahkan onChange
					/>
					<button type="submit" className="w-full bg-color-brand text-text-negative mt-6 p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer disabled:opacity-50" disabled={isPending}>
						{isPending ? 'Generating...' : 'Generate'}
					</button>
				</form>

				{/* ... Tampilkan pesan status atau error ... */}
			</div>

			{generatedRoadmap && (
				<>
					<form action={saveRoadmapAction}>
						{/* ✅ STEP 3: Gunakan state `topic` yang sudah pasti ada nilainya */}
						<input type="hidden" name="title" value={topic} />
						<input type="hidden" name="roadmapData" value={JSON.stringify(generatedRoadmap)} />

						<button type="submit" className="bg-color-brand2 text-text-negative mt-6 px-4 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex mx-auto disabled:opacity-50" disabled={isPending}>
							<span className="material-icons-outlined m-0" style={{ fontSize: '1.5rem' }}>
								save
							</span>
							<span className="ml-2">Save to My Account</span>
						</button>
					</form>

					<TreeRoadmap RoadmapData={generatedRoadmap} />
				</>
			)}
		</MainLayout>
	);
}
