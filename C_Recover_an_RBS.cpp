#include <bits/stdc++.h>
#define int long long int
#define IOS()                         \
    ios_base::sync_with_stdio(false); \
    cin.tie(NULL);                    \
    cout.tie(NULL)
#define mod 1000000007
const int sz = 2 * 1e5 + 5;
using namespace std;
int power(int x, int y, int m)
{
    if (y == 0)
        return 1;

    int p = power(x, y / 2, m) % m;
    p = (p * p) % m;

    return (y % 2 == 0) ? p : (x * p) % m;
}
int mdinn(int n) { return power(n, mod - 2, mod); }
signed main()
{
    IOS();
    int t;
    cin >> t;
    while (t--)
    {
        string s;
        cin >> s;
        int count = 0;
        int open = 0, close = 0;
        int n = s.length();
        for (int i = 0; i < s.length(); i++)
        {
            if (s[i] == ')')
                close++;
            else
                open++;
        }
        if (s[0] == '?')
            open++;
        if (s[s.length() - 1] == '?')
            close++;
        if (open == n / 2 || close == n / 2)
            cout << "YES\n";
        else
            cout << "NO\n";
    }
}