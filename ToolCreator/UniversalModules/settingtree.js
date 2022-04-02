class branch 
{
    branch(leaves, branches)
    {
        branch.leaves = leaves
        branch.branches = branches
    }

    addbranch(branch, leaves)
    {
        this.branches[branch] = leaves;
    }
}

