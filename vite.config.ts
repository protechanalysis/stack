import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		modulePreload: {
			polyfill: true,
		},
	},
	server: {
		port: 5173,
		host: "127.0.0.1",
	},
	plugins: [
		nodePolyfills({
			globals: {
				Buffer: true,
			},
		}),
		react(),
	],
});

const requestVerifyMessage = async (
  e: FormEvent,
  appId: string,
  schemaId: string,
) => {
  e.preventDefault();
  try {
    const connector = new TransgateConnect(appId);
    const isAvailable = await connector.isTransgateAvailable();

    if (isAvailable) {
      const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null;
      const signer = await provider?.getSigner()
      const recipient = await signer?.getAddress()
      const res = (await connector.launch(schemaId, recipient)) as Result;
      console.log("Result", res);

} else {
      console.log(
        "Please install zkPass Transgate from https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma",
      );
    }
  } catch (error) {
    const transgateError = error as TransgateError;
    alert(`Transgate Error: ${transgateError.message}`);
    console.log(transgateError);
  }
};