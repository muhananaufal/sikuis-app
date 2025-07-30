'use client';

import MainLayout from '@/components/MainLayout';
import TreeRoadmap, { RoadmapItem } from '@/components/TreeRoadmap';
import { useActionState, useState, useEffect } from 'react';
// Import tipe state yang baru kita buat
import { generateRoadmapAction, saveRoadmapAction, RoadmapState, SaveState } from './action';

// Initial state untuk form GENERATE
const initialGenerateState: RoadmapState = {};

// Initial state untuk form SAVE
const initialSaveState: SaveState = {};

export default function GenerateRoadmaps() {
	// Hook untuk form GENERATE
	const [generateState, generateFormAction, isGeneratePending] = useActionState(generateRoadmapAction, initialGenerateState);

	// Hook untuk form SAVE
	const [saveState, saveFormAction, isSavePending] = useActionState(saveRoadmapAction, initialSaveState);

	const [topic, setTopic] = useState('');
	const [generatedRoadmap, setGeneratedRoadmap] = useState<RoadmapItem[] | null>(null);

	useEffect(() => {
		if (generateState?.data) {
			setGeneratedRoadmap(generateState.data);
		}
	}, [generateState]);

	return (
		<MainLayout>
			<div className="max-w-xl mx-auto mt-10 p-6">
				<h2 className="text-3xl font-semibold text-color-brand text-center">Generate Roadmaps with AI</h2>
				{/* ... */}
				<form action={generateFormAction}>
					<input
						type="text"
						name="topic"
						placeholder="Enter a topic to generate roadmap for"
						required
						className="w-full border-2 border-text-secondary px-4 py-4 text-text-primary focus:outline-none rounded-xl text-center"
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
					/>
					<button type="submit" className="w-full bg-color-brand text-text-negative mt-6 p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer disabled:opacity-50" disabled={isGeneratePending}>
						{isGeneratePending ? 'Generating...' : 'Generate'}
					</button>
				</form>

				{/* Tampilkan pesan status/error dari generate action */}
				{generateState?.error && <p className="text-red-500 text-center mt-4">{generateState.error}</p>}
				{generateState?.message && <p className="text-green-500 text-center mt-4">{generateState.message}</p>}
			</div>

			{generatedRoadmap && (
				<>
					{/* --- PERUBAHAN DI SINI --- */}
					{/* Gunakan `saveFormAction` dari hook useActionState yang kedua */}
					<form action={saveFormAction}>
						<input type="hidden" name="title" value={topic} />
						<input type="hidden" name="roadmapData" value={JSON.stringify(generatedRoadmap)} />

						{/* Tombol Save sekarang menggunakan `isSavePending` */}
						<button type="submit" className="bg-color-brand2 text-text-negative mt-6 px-4 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex mx-auto disabled:opacity-50" disabled={isSavePending}>
							<span className="material-icons-outlined m-0" style={{ fontSize: '1.5rem' }}>
								{isSavePending ? 'hourglass_top' : 'save'}
							</span>
							<span className="ml-2">{isSavePending ? 'Saving...' : 'Save to My Account'}</span>
						</button>
						{/* Tampilkan pesan error dari save action */}
						{saveState?.error && <p className="text-red-500 text-center mt-2">{saveState.error}</p>}
					</form>

					<TreeRoadmap RoadmapData={generatedRoadmap} />
				</>
			)}
		</MainLayout>
	);
}
