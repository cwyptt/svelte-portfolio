import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
export const prerender = true;

export const GET: RequestHandler = async () => {
	try {
		const filePath = path.join(process.cwd(), 'static', 'resume.pdf');
		const fileBuffer = await fs.promises.readFile(filePath);

		return new Response(fileBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'inline; filename="alex-hanson-resume.pdf"',

				// Cache for 1 hour
				'Cache-Control': 'public, max-age=3600',
			}
		});
	} catch (err) {
		console.error('Error serving resume:',err);
		throw error(404, 'Resume not found');
	}


}