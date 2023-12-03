using SharpLab.Runtime;

[JitGeneric(typeof(int))]
[JitGeneric(typeof(decimal))]
[JitGeneric(typeof(string))]
static class C<T> {
    static T M() {
        return default(T);
    }
}

/* asm

; Core CLR <IGNORE> on x64

C`1[[System.Int32, System.Private.CoreLib]].M()
    L0000: xor eax, eax
    L0002: ret

C`1[[System.Decimal, System.Private.CoreLib]].M()
    L0000: vzeroupper
    L0003: vxorps xmm0, xmm0, xmm0
    L0007: vmovdqu [rcx], xmm0
    L000b: mov rax, rcx
    L000e: ret

C`1[[System.__Canon, System.Private.CoreLib]].M()
    L0000: xor eax, eax
    L0002: ret

*/