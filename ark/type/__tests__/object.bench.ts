import { bench } from "@ark/attest"
import { type } from "arktype"

bench.baseline(() => {
	type({
		_: "symbol[]",
		__: { ___: "symbol[]" }
	})

	type(["symbol[]", "symbol[]", ["symbol[]"]])
})

bench("dictionary", () => {
	const dict = type({
		a: "string[]",
		b: "number[]",
		c: { nested: "boolean[]" }
	})
}).types([3573, "instantiations"])

bench("dictionary with optional keys", () => {
	const dict = type({
		"a?": "string[]",
		"b?": "number[]",
		"c?": { "nested?": "boolean[]" }
	})
}).types([2810, "instantiations"])

bench("tuple", () => {
	const tuple = type(["string[]", "number[]", ["boolean[]"]])
}).types([2829, "instantiations"])
