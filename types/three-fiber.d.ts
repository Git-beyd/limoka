import type { ThreeElements } from "@react-three/fiber";

// Fix for eslint @typescript-eslint/no-empty-object-type
declare module "react" {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends ThreeElements {}
  }
}
