import { Address, AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import wallet from "./dev-wallet.json";
import { IDL, WbaPrereq } from "./programs/wba_prereq";


const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection("https://api.devnet.solana.com");

const github = Buffer.from("eliffvural", "utf8")
// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
    commitment: "confirmed"
});

// Create our program
const program = new Program<WbaPrereq>(IDL,
    "111111111111111111111111" as Address, provider);

// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"),
keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] =
    PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

// Execute our enrollment transaction
(async () => {
    try {
        const txhash = await program.methods
            .complete(github)
            .accounts({
                signer: keypair.publicKey,
                prereq: enrollment_key,
                systemProgram: SystemProgram.programId,
            })
            .signers([
                keypair
            ]).rpc();
        console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();