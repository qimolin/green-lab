import os
import pandas as pd

avg_usages_cols = []

for folder in os.listdir("."):
    if folder.startswith("run_table") or not folder.startswith("run_"):
        continue

    # print(folder)
    df = pd.read_csv(os.path.join(folder, "energibridge.csv"))
    usage_avg = df[[col for col in df.columns if col.startswith("CPU_USAGE")]].mean(axis=1)
    avg_usages_cols.append(usage_avg.rename(folder))


# Save to separate csv
usages_pd = pd.concat(avg_usages_cols, axis=1)
usages_pd["Delta"] = pd.Series([0, 199] + [200] * (len(usages_pd.columns) - 2))
usages_pd = usages_pd.reindex(sorted(usages_pd.columns), axis=1)
usages_pd.to_csv("usages.csv", index=False)

usages_pd = pd.read_csv("usages.csv")

# Save to runtable csv
runtable_df = pd.read_csv("run_table.csv", index_col=False)
for run in runtable_df["__run_id"]:
    runtable_df.loc[runtable_df["__run_id"] == run, "avg_cpu_usage"] = usages_pd[run].mean()
runtable_df.to_csv("run_table_with_avg_usage.csv")
