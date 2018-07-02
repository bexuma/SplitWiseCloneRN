const totalBalanceHelper = {
	getAggregateBalance: (friendName, transactions) => {
	  const friend_transactions = transactions.filter(transaction => transaction.name === friendName)
	  let aggregate_balance = 0

	  for(let i = 0; i < friend_transactions.length; i++) {
	    aggregate_balance += friend_transactions[i].balance
	  }

	  return aggregate_balance
	}

	// iOwe: (friends, transactions) => {
 //    let iOwe = 0
 //    for(let i = 0; i < friends.length; i++) {
 //      if (getAggregateBalance(friends[i].name, transactions) < 0) {
 //        iOwe += getAggregateBalance(friends[i].name, transactions)
 //      }
 //    }
 //    return -iOwe
 //  },

	// iAmOwed: (friends, transactions) => {
	//   let iAmOwed = 0
 //    for(let i = 0; i < friends.length; i++) {
 //      if (getAggregateBalance(friends[i].name, transactions) > 0) {
 //        iAmOwed += getAggregateBalance(friends[i].name, transactions)
 //      }
 //    }
 //    return iAmOwed
	// }
}

export default totalBalanceHelper;
