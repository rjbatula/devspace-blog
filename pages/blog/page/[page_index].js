import Layout from '@/components/Layout'
import fs from 'fs'
import path from 'path'
import Post from '@/components/Post'
import { POST_PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'
import { getPosts } from '@/lib/posts'

export default function BlogPage({ posts, numPages, currentPage }) {
	return (
		<Layout>
			<h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>

			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
				{posts.map((post, index) => (
					<Post key={index} post={post} />
				))}
			</div>
			<Pagination currentPage={currentPage} numPages={numPages} />
		</Layout>
	)
}

export async function getStaticPaths() {
	const files = fs.readdirSync(path.join('posts'))

	const numPages = Math.ceil(files.length / POST_PER_PAGE)

	let paths = []

	for (let i = 1; i <= numPages; i++) {
		paths.push({
			params: {
				page_index: i.toString(),
			},
		})
	}

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	// Check for page index
	const page = parseInt((params && params.page_index) || 1)

	const files = fs.readdirSync(path.join('posts'))

	// Create a slug and front matter data
	const posts = getPosts()

	const numPages = Math.ceil(files.length / POST_PER_PAGE)
	const pageIndex = page - 1
	const orderedPost = posts.slice(
		pageIndex * POST_PER_PAGE,
		(pageIndex + 1) * POST_PER_PAGE
	)

	return {
		props: {
			posts: orderedPost,
			numPages,
			currentPage: page,
		},
	}
}
