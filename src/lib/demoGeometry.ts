import { demoEdges, demoNodes, diagram } from '../data/demo';
import type { DemoEdge, DemoNode, DemoNodeId, PacketHop } from '../types';

export type Pt = readonly [x: number, y: number];

export const nodeById = new Map<DemoNodeId, DemoNode>(demoNodes.map((nd) => [nd.id, nd]));

/** Where the line from a node's centre towards (tx, ty) leaves its box. */
function anchor(nd: DemoNode, ny: number, tx: number, ty: number): Pt {
  const dx = tx - nd.x;
  const dy = ty - ny;
  if (!dx && !dy) return [nd.x, ny];
  const s = Math.min(nd.w / 2 / Math.abs(dx || 1e-9), diagram.nodeH / 2 / Math.abs(dy || 1e-9));
  return [nd.x + dx * s, ny + dy * s];
}

export interface EdgeGeom {
  d: string;
  pts: Pt[];
}

/** `sy` stretches the layout vertically; node boxes and text keep their size. */
function geom(edge: DemoEdge, sy: number): EdgeGeom {
  const A = nodeById.get(edge.from);
  const B = nodeById.get(edge.to);
  if (!A || !B) throw new Error(`edge ${edge.id}: unknown node`);
  const ay = A.y * sy;
  const by = B.y * sy;
  if (!edge.bend) {
    const a = anchor(A, ay, B.x, by);
    const b = anchor(B, by, A.x, ay);
    return { d: `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`, pts: [a, b] };
  }
  const dx = B.x - A.x;
  const dy = by - ay;
  const len = Math.hypot(dx, dy);
  const c: Pt = [(A.x + B.x) / 2 - (dy / len) * edge.bend, (ay + by) / 2 + (dx / len) * edge.bend];
  const a = anchor(A, ay, c[0], c[1]);
  const b = anchor(B, by, c[0], c[1]);
  const pts = Array.from({ length: 13 }, (_, i): Pt => {
    const t = i / 12;
    const u = 1 - t;
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
  });
  return { d: `M${a[0]} ${a[1]} Q${c[0]} ${c[1]} ${b[0]} ${b[1]}`, pts };
}

export const buildEdges = (sy: number) => new Map<string, EdgeGeom>(demoEdges.map((ed) => [ed.id, geom(ed, sy)]));
const edgeGeom = buildEdges(1);

/** Shortest chain of edges from → to (undirected edges work both ways), as a polyline. */
export function packetPath({ from, to }: PacketHop, geoms = edgeGeom): Pt[] {
  const prev = new Map<DemoNodeId, { via: DemoEdge; back: boolean; from: DemoNodeId }>();
  const queue: DemoNodeId[] = [from];
  for (let i = 0; i < queue.length && !prev.has(to); i++) {
    const at = queue[i];
    for (const ed of demoEdges) {
      const fwd = ed.from === at;
      const back = ed.line && ed.to === at;
      const next = fwd ? ed.to : back ? ed.from : null;
      if (next && next !== from && !prev.has(next)) {
        prev.set(next, { via: ed, back: !fwd, from: at });
        queue.push(next);
      }
    }
  }
  const hops: Pt[][] = [];
  for (let at = to; at !== from; ) {
    const p = prev.get(at);
    if (!p) return [];
    const pts = geoms.get(p.via.id)?.pts ?? [];
    hops.unshift(p.back ? [...pts].reverse() : pts);
    at = p.from;
  }
  return hops.flat();
}
