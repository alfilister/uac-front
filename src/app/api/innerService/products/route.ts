import { NextResponse } from 'next/server'
import accountsData from '@/data/savings-accounts.json'

export async function GET() {
	console.log(`[${new Date().toISOString()}] 🔄 Refreshing products data (cache revalidation)`)

	return NextResponse.json(accountsData, {
		headers: {
			'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
		},
	})
}
