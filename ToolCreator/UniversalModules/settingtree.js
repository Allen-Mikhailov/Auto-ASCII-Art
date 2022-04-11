class branch 
{
    branch(leaves, branches)
    {
        branch.leaves = leaves
        branch.branches = branches
    }

    addbranch(branch, leaves)
    {
        leaves.parent = this
        this.branches[branch] = leaves;
    }

    pass(branch) {
        return this.branches[branch]
    }

    follow(branches)
    {
        head = this
        for (var i = 0; i < branches.length; i++)
        {
            head.pass(branches[i])
        }
        return head
    }
}

export default branch