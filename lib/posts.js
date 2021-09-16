import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '@/utils/index'

const files = fs.readdirSync(path.join('posts'))

export function getPosts() {
	// Create a slug and front matter data
	const posts = files.map((filename) => {
		//const slug = filename.split('.')[0]
		const slug = filename.replace('.md', '')

		const markdownWithMeta = fs.readFileSync(
			path.join('posts', filename),
			'utf-8'
		)

		const { data: frontmatter } = matter(markdownWithMeta)

		return {
			slug,
			frontmatter,
		}
	})

	return posts.sort(sortByDate)
}
