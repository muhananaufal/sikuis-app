/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useActionState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { generateSummaryAndQuizAction, SummaryQuizState } from '@/app/(app)/u/roadmaps/[roadmapId]/actions';
import type { RoadmapItem } from './TreeRoadmap';

const initialState: SummaryQuizState = {};

export function NodeInteractionDialog({ node, isMobile }: { node: RoadmapItem; isMobile: boolean }) {
	const [state, formAction, isPending] = useActionState(generateSummaryAndQuizAction, initialState);

	return (
		<DialogContent className={`${isMobile ? 'max-w-[95vw] max-h-[85vh]' : 'max-w-2xl max-h-[80vh]'} overflow-y-auto`}>
			<DialogHeader>
				<DialogTitle className={`flex items-center gap-3 ${isMobile ? 'text-lg' : 'text-xl'}`}>{node.title}</DialogTitle>
			</DialogHeader>

			<div className="mt-4">
				<p className={`text-slate-700 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>{node.description}</p>

				{/* <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
					{state.data ? (
						<div>
							<h4 className="font-bold text-lg text-slate-800">Summary</h4>
							<p className="mt-2 text-slate-600">{state.data.summary}</p>

							<h4 className="font-bold text-lg text-slate-800 mt-6">Quiz</h4>
							<div className="mt-2 space-y-4">
								{state.data.questions.map((q, index) => (
									<div key={index}>
										<p className="font-semibold">
											{index + 1}. {q.question}
										</p>
										<p className="text-sm text-green-700">Answer: {q.answer}</p>
									</div>
								))}
							</div>
						</div>
					) : (
						<form action={formAction} className=''>
							<input type="hidden" name="nodeTitle" value={node.title} />
							<input type="hidden" name="nodeDescription" value={node.description} />
							<button type="submit" disabled={isPending} className="w-full bg-blue-600 text-white p-3 font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-slate-400">
								{isPending ? 'Generating...' : '✨ Generate Summary & Quiz'}
							</button>
							{state.error && <p className="text-red-500 text-sm mt-2 text-center">{state.error}</p>}
						</form>
					)}
				</div> */}
			</div>
		</DialogContent>
	);
}
