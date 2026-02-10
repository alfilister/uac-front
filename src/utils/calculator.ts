
export interface SimulationResult {
	totalInvested: number
	estimatedInterest: number
	finalAmount: number
}


const MONTHLY_INTEREST_RATE = 0.005

export const calculateInterest = (
	initialAmount: number,
	monthlyContribution: number,
	months: number
): SimulationResult => {
	let totalInvested = initialAmount
	let estimatedInterest = 0
	let currentBalance = initialAmount

	for (let i = 1; i <= months; i++) {
		const monthlyInterest = currentBalance * MONTHLY_INTEREST_RATE
		estimatedInterest += monthlyInterest

		currentBalance += monthlyContribution
		totalInvested += monthlyContribution

		currentBalance += monthlyInterest
	}

	return {
		totalInvested,
		estimatedInterest,
		finalAmount: currentBalance,
	}
}
