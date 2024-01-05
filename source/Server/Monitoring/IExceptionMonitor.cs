using System;
using System.Collections.Generic;
using MirrorSharp.Advanced;

namespace SharpLab.Server.Monitoring;
public interface IExceptionMonitor {
    void Exception(Exception exception, IWorkSession? session, IDictionary<string, string>? extras = null);
}
