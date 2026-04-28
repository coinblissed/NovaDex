import { rpc, Contract, Address, Keypair, scValToNative, xdr, TransactionBuilder, Networks } from "@stellar/stellar-sdk";

const RPC_URL = "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";
const server = new rpc.Server(RPC_URL);

// Use the SDKE Issuer as the deployer/liquidity provider
const ADMIN_SECRET = "SCK6O7B6ZBGBKIFNWA5BTRRF7SO23MIZSEFQRBQV5OV5LOVCO5HO4JUD";
const adminKeypair = Keypair.fromSecret(ADMIN_SECRET);

const FACTORY_ID = "CC6XX5QZTRPAHY2NU23LE6RKJUAQIQVHJURLU2VRKMV43XZWPOA7CGTT";
const TOKEN_A = "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"; // XLM
const TOKEN_B = "CCUUYZWLVQ4QLFFPE4CBGTP7Q6JSPZ7HF54ETS5C2BSG7XPG4KLX6SFH"; // SDKE

async function deployPool() {
  console.log("Deploying new pool for NovaDEX...");
  console.log("Token A (XLM):", TOKEN_A);
  console.log("Token B (SDKE):", TOKEN_B);

  const factory = new Contract(FACTORY_ID);
  const account = await server.getAccount(adminKeypair.publicKey());

  // 1. Create Pool
  const tx = new TransactionBuilder(account, { fee: "100000", networkPassphrase: NETWORK_PASSPHRASE })
    .addOperation(factory.call("create_pool", 
      new Address(TOKEN_A).toScVal(),
      new Address(TOKEN_B).toScVal()
    ))
    .setTimeout(30)
    .build();

  tx.sign(adminKeypair);
  
  try {
    const result = await server.sendTransaction(tx);
    console.log("Transaction sent:", result.hash);
    
    // Wait for result
    let status = "PENDING";
    let txResult;
    while (status === "PENDING") {
      await new Promise(r => setTimeout(r, 2000));
      txResult = await server.getTransaction(result.hash);
      status = txResult.status;
    }

    if (status === "SUCCESS") {
       const poolAddress = scValToNative(txResult.returnValue);
       console.log("SUCCESS! New Pool Address:", poolAddress);
       return poolAddress;
    } else {
      console.error("Failed to create pool:", txResult);
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

deployPool();
