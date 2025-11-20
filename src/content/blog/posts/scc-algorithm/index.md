---
title: 'SCC algorithm'
description: 'Study and implementation of scc algorithm. Tarjan`s algorithm and Kosaraju`s algorithm'
pubDate: 'Nov 15 2025'
thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdEyDsjLeuMJZu1zRqcsVNUt9_jpomLl5aZg&s'
category: 'CSE'
subCategory: 'Algorithm'
---

유향그래프에서 임의의 두 정점 u, v에 대해 u→v, v→u인 경로가 모두 존재하면 두 점은 SCC의 집합 요소임. 사이클이 발생한 정점들은 모두 같은 SCC집합의 요소. 

무향그래프의 경우 그래프 전체가 SCC이므로 의미가 없음.

Tarjan’s algorithm

DFS기반으로 탐색 → Stack에 정점을 쌓으면서 사이클이 검출되면 Union-Find 처럼 부모를 합치고 사이클의 시작점까지 Stack에서 pop하면 하나의 SCC가 검출, Stack에 남은 요소들은 모두 pop하여 단일한 요소의 SCC로 정의.

모든 노드에 대해 시행 시 SCC들로 그래프를 나타낼 수 있음.

```cpp
// Tarjan's algorithm
#include <bits/stdc++.h>
using namespace std;

static int id = 0;

int dfs(vector<vector<int>>& graph, vector<vector<int>>& SCC, vector<int>& uid, vector<int>& finished, stack<int>& st, int cur) {
    uid[cur] = ++id;
    st.push(cur);

    int parent = uid[cur];
    for (int next : graph[cur])
    {
        if (uid[next] == 0) parent = min(parent, dfs(graph, SCC, uid, finished, st, next));
        else if (!finished[next]) parent = min(parent, uid[next]);
    }

    if (parent == uid[cur]) {
        vector<int> scc;
        while (1)
        {
            int top = st.top(); st.pop();
            scc.push_back(top);
            finished[top] = true;
            if (top == cur) break;
        }
        SCC.push_back(scc);
    }
    return parent;
};

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int V, E; cin >> V >> E;
    vector<vector<int>> graph(V + 1);
    vector<vector<int>> SCC;
    vector<int> uid(V + 1, 0);
    vector<int> finished(V + 1, 0);
    stack<int> st;
    for (int i = 0; i < E; i++)
    {
        int u, v; cin >> u >> v;
        graph[u].emplace_back(v);
    }

    for (int i = 1; i < V + 1; i++)
    {
        if (uid[i] != 0) continue;
        dfs(graph, SCC, uid, finished, st, i);
    }

    for (int i = 0; i < SCC.size(); i++) sort(SCC[i].begin(), SCC[i].end());
    sort(SCC.begin(), SCC.end(), [](const auto& a, const auto& b) {return a[0] < b[0]; });
    
    cout << SCC.size() << '\n';
    for (int i = 0; i < SCC.size(); i++)
    {
        for (int j = 0; j < SCC[i].size(); ++j) {
            cout << SCC[i][j] << ' ';
        }
        cout << -1 << '\n';
    }
    return 0;
}

```

Kosaraju’s algorithm

유향 그래프의 간선 방향을 뒤집은 그래프가  SCC집합을 그대로 유지함을 이용하는 방식

DFS로 정방향 그래프를 순회하며 마지막에 탐색된 정점부터 Stack에 push → 뒤집힌 그래프를 Stack top에 해당하는 정점부터 다시 DFS로 순회하며 사이클 검출 시 SCC 집합 추가, 모든 정점이 pop 될 때까지 반복

```cpp
// Kosaraju's algorithm
#include <bits/stdc++.h>
using namespace std;

void dfs(const vector<vector<int>>& graph, vector<int>& visited, stack<int>& st, int cur) {
    visited[cur] = 1;
    for (int next : graph[cur]) {
        if (!visited[next]) dfs(graph, visited, st, next);
    }
    st.push(cur);
}

void reversedDfs(const vector<vector<int>>& graph, vector<int>& visited, vector<int>& SCC, int cur) {
    visited[cur] = 1;
    SCC.push_back(cur);
    for (int next : graph[cur]) {
        if (!visited[next]) reversedDfs(graph, visited, SCC, next);
    }
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int V, E; cin >> V >> E;
    vector<vector<int>> graph(V + 1);
    vector<vector<int>> reversedGraph(V + 1);
    vector<vector<int>> SCC;
    vector<int> visited(V + 1, 0);
    stack<int> st;
    for (int i = 0; i < E; i++)
    {
        int u, v; cin >> u >> v;
        graph[u].emplace_back(v);
        reversedGraph[v].emplace_back(u);
    }
    for (int i = 1; i < V + 1; i++)
    {
        if (visited[i] != 0) continue;
        dfs(graph, visited, st, i);
    }

    for (int i = 0; i < V + 1; ++i) visited[i] = 0;
    while (!st.empty())
    {
        int top = st.top(); st.pop();
        if (!visited[top]) {
            vector<int> scc;
            reversedDfs(reversedGraph, visited, scc, top);
            SCC.push_back(scc);
        }
    }

    for (int i = 0; i < SCC.size(); i++) sort(SCC[i].begin(), SCC[i].end());
    sort(SCC.begin(), SCC.end(), [](const auto& a, const auto& b) {return a[0] < b[0]; });
    
    cout << SCC.size() << '\n';
    for (int i = 0; i < SCC.size(); i++)
    {
        for (int j = 0; j < SCC[i].size(); ++j) {
            cout << SCC[i][j] << ' ';
        }
        cout << -1 << '\n';
    }
    return 0;
}

```
