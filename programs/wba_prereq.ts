export type WbaPrereq =  = { "version": "0.1.0", "name": "wba_prereq", ...etc };
export const IDL: WbaPrereq = { "version": "0.1.0", "name": "wba_prereq", ...etc };


import { Connection, Keypair } from "@solana/web3.js"
import wallet from "./dev-wallet.json"
import { WbaPrereq } from "./programs/wba_prereq"

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection("https://api.devnet.solana.com");

const github = Buffer.from("<your github account>", "utf8");

const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed" });

const program: Program<WbaPrereq> = new Program(IDL, provider);