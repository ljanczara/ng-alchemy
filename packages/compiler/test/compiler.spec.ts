import {
    compile,
    CompilerUnit,
    CompilerUnitTransformer,
    crateCompilationUnit,
    crateCompilerConfig,
    SourceTransformation
} from "../src";
import {TSTranspilerData} from "../src/transpiler/model";

describe('compiler spec', () => {
    it('should throw error if compiler config is null', () => {
        expect(() => compile(crateCompilationUnitMock(), null)).toThrowError('[ng-alchemy][error] config can\'t be null!');
    });

    it('should throw error if compiler compilation unit is null', () => {
        expect(() => compile(null, null)).toThrowError('[ng-alchemy][error] compilation unit can\'t be null!');
    });

    it('should return same output if list of transformers are empty', () => {
        const result = compile(crateCompilationUnitMock(), crateCompilerConfig());

        expect(result).toEqual(crateCompilationUnitMock().content);
    });

    it('should return same output if list of transformers are empty', () => {
        const transformer: CompilerUnitTransformer = {
            transform(content: TSTranspilerData): Array<SourceTransformation> {
                const token = 'Foo';
                const start = content.input.indexOf(token);
                const end = start + token.length;
                return [new SourceTransformation(start, end, 'Bar')];
            }
        };
        const result = compile(crateCompilationUnitMock(), crateCompilerConfig(transformer));

        expect(result).toEqual('export class Bar {}');
    })
});

function crateCompilationUnitMock(content ?: string): CompilerUnit {
    return crateCompilationUnit('Foo.ts', content || 'export class Foo {}');
}
