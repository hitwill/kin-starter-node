import { Client, Environment, kinToQuarks, PrivateKey, PublicKey, TransactionType } from '@kinecosystem/kin-sdk-v2'

export class Kin {
  static generateKey() {
    return PrivateKey.random()
  }

  readonly client: Client

  constructor(env: Environment, appIndex?: number) {
    this.client = new Client(env, { appIndex, kinVersion: 4 })
    console.log(`Kin Environment: ${Environment[Environment.Test]}`)
  }

  async createAccount(privateKey: PrivateKey): Promise<PublicKey[]> {
    // Create Account
    await this.client.createAccount(privateKey)
    // Resolve Token Account
    return this.client.resolveTokenAccounts(privateKey.publicKey())
  }

  async getBalance(account: PublicKey) {
    return this.client.getBalance(account)
  }

  async requestAirdrop(publicKey: PublicKey, amount: string) {
    return this.client.requestAirdrop(publicKey, kinToQuarks(amount))
  }

  async submitPayment(
    sender: PrivateKey,
    destination: PublicKey,
    amount: string,
    type: TransactionType,
    memo?: string,
  ) {
    return this.client.submitPayment({
      sender,
      destination,
      type,
      memo,
      quarks: kinToQuarks(amount),
    })
  }
}
