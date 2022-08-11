using SharpLab.Runtime;

static class C {
    [JitGeneric(typeof(int))]
    [JitGeneric(typeof(string))]
    static class N<T> {
        static T M => default(T);
    }
}

/* asm

; Desktop CLR <IGNORE> on amd64

C+N`1[[System.Int32, mscorlib]].get_M()
    L0000: xor eax, eax
    L0002: ret

C+N`1[[System.__Canon, mscorlib]].get_M()
    L0000: xor eax, eax
    L0002: ret

*/