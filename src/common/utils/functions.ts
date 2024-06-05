import { Request } from 'express';

export function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return 'Bearer' === type ? token : undefined;
}

export function mergeArrays<
  TItemA extends object,
  TItemB extends object,
  TKey extends keyof TItemA & TItemB,
>(
  arrayA: TItemA[],
  arrayB: TItemB[],
  callbackFn: (value: TItemA | TItemB) => (TItemA & TItemB)[TKey],
): (TItemA & TItemB)[] {
  const resultMap = new Map<(TItemA & TItemB)[TKey], any>();

  arrayA?.forEach((item) => {
    const key = callbackFn(item);
    resultMap.set(key, item);
  });

  arrayB?.forEach((item) => {
    const key = callbackFn(item);
    const oldItem = resultMap.get(key);
    resultMap.set(key, { ...oldItem, ...item });
  });

  return Array.from(resultMap.values());
}
