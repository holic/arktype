import { intrinsic, rootNode } from "@ark/schema"
import type { Submodule } from "../../module.ts"
import type { Branded, To, constrain } from "../ast.ts"
import { submodule } from "../utils.ts"

declare namespace string {
	export type json = constrain<string, Branded<"json">>
}

const jsonStringDescription = "a JSON string"

const isParsableJson = (s: string) => {
	try {
		JSON.parse(s)
		return true
	} catch {
		return false
	}
}

const $root = rootNode({
	domain: "string",
	predicate: {
		meta: jsonStringDescription,
		predicate: isParsableJson
	}
})

export const json = submodule({
	$root,
	parse: rootNode({
		in: "string",
		morphs: (s: string, ctx) => {
			if (s.length === 0) {
				return ctx.error({
					code: "predicate",
					expected: jsonStringDescription,
					actual: "empty"
				})
			}
			try {
				return JSON.parse(s)
			} catch (e) {
				return ctx.error({
					code: "predicate",
					expected: jsonStringDescription,
					problem: `must be ${jsonStringDescription} (${e})`
				})
			}
		},
		declaredOut: intrinsic.json
	})
})

export type json = Submodule<{
	$root: string.json
	parse: (In: string.json) => To<object>
}>
